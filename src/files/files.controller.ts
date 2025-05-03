import { Express, Response } from './../../node_modules/@types/express-serve-static-core/index.d';
import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException, Get, Res, Param } from '@nestjs/common';
import { FilesService } from './files.service'; 
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helper';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
  ) {}
  
  @Get('applicant/:documentName')
  findApplicanDocument(
    @Res() res: Response,
    @Param('documentName') documentName: string){
      const path = this.filesService.getStaticApplicantDocument( documentName );

      res.sendFile(path);
    }

  @Post('files')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/curriculums',
      filename: fileNamer
    })
    //limits: { fileSize: 1000}
  }))

  uploadFileAplicant(
      @UploadedFile() file: Express.Multer.File,    
    ){

      if(!file){
        throw new BadRequestException('No hay archivo seleccionado!')
      }
      //const secureUrl = `${ file.filename }`;
      //console.log({ fileIncontroller: file})
      const secureUrl = `${ this.configService.get('HOST_API') }/files/applicant/${ file.filename }`;
      
      return {
      //fileName: file.originalname
      secureUrl
    };
  }

}
