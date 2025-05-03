import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Applicant } from './entities/applicant.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../commons/dtos/pagination.dto';

@Injectable()
export class ApplicantService {

  private readonly logger = new Logger('ApplicantService')

  constructor(
    @InjectRepository(Applicant )
    private readonly applicantRepository: Repository<Applicant>
  ){}

  async newApplicant(createApplicantDto: CreateApplicantDto) {

    try {
      const applicant = this.applicantRepository.create(createApplicantDto);
      await this.applicantRepository.save(applicant);
      
      return applicant;

    } catch (error) {
      //throw new InternalServerErrorException('Error!');
      this.handleDBExceptions(error);
    }
  }

  async findApplicant(Id: number) {
    const applicant = this.applicantRepository.findOneBy({Id});

    if(!applicant)
      throw new NotFoundException(`Aplicante con id: ${Id} no encontrado`);
    
    return applicant
  }
  
  async findApplicants( paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto; 
    
    const applicants = await this.applicantRepository.find({
      take: limit,
      skip: offset,
    })
    //console.log(applicants)    
    return  applicants.map( (applicant) => applicant );
  }

  async UpdateApplicant(id: number, updateApplicantDto: UpdateApplicantDto) {
    const applicant = await this.applicantRepository.preload({
      Id: Number(id), 
      ...updateApplicantDto
    });

    if(!applicant)
      throw new NotFoundException(`Aplicante con id: ${id} no encontrado`)

      try {
        await this.applicantRepository.save(applicant);
        return applicant;
      
      } catch (error) {
        this.handleDBExceptions(error);  
      }
  }

  async removeApplicant(Id: number) {
    const applicant = await this.findApplicant(Id)
    await this.applicantRepository.remove(applicant)
  }

  private handleDBExceptions( error: any){
    if (error.code === '23505'){
      throw new BadRequestException(error.detail);

      this.logger.error(error)

      throw new InternalServerErrorException('Ya existe un registro con ese valor único')
    }
  }
}
