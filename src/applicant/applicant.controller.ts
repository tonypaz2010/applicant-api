import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApplicantService } from './applicant.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { PaginationDto } from 'src/commons/dtos/pagination.dto';

@Controller('applicant')
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService) {}

  @Post()
  newApplicant(
    @Body() createApplicantDto: CreateApplicantDto) {
      return this.applicantService.newApplicant(createApplicantDto);
  }

  @Get()
  findApplicants(
    @Query() paginationDto: PaginationDto
  ) {
    return this.applicantService.findApplicants(paginationDto);
  }

  @Get(':id')
  findApplicant(@Param('id') id: number) {
    return this.applicantService.findApplicant(+id);
  }

  @Patch(':id')
  UpdateApplicant(@Param('id') id: string, @Body() updateApplicantDto: UpdateApplicantDto) {
    return this.applicantService.UpdateApplicant(+id, updateApplicantDto);
  } 

  @Delete(':id')
  removeApplicant(@Param('id') id: string) {
    return this.applicantService.removeApplicant(+id);
  }
}
