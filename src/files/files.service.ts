import { join } from 'path';
import { BadRequestException, Injectable } from '@nestjs/common'; 
import { existsSync } from 'fs';

@Injectable()
export class FilesService {

  getStaticApplicantDocument( documentName: string){
    const path = join( __dirname, '../../static/curriculums', documentName);

    if( !existsSync(path) )
        throw new BadRequestException(`Documento no encontrado ${ documentName }`);
    
        return path;
  }
}
