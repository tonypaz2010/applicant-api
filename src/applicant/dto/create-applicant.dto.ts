import { Type } from "class-transformer";
import { IsString, IsDate, IsPositive, IsNumber, IsOptional } from "class-validator";

export class CreateApplicantDto {
    
    @IsString()
    Nombre: string;

    @IsString()
    Apellido: string; 

    @IsString()
    Correo: string;

    @IsString()
    Genero: string;

    @IsNumber()
    @IsPositive()
    Edad: string;

    @IsString()
    Identidad: string;

    @IsString()
    Telefono: string;

    @IsString()
    Puesto_aplica: string;

    @IsString()
    Ciudad: string;

    @IsString()
    Nivel_educativo: string;

    @IsString()
    Empresa: string;

    @IsString()
    Bilingue: string;

    @IsString()
    Curriculum: string;

    @IsDate()
    @Type(() => Date)
    Fecha_envio: Date;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    Fecha_revision: Date;

    @IsString()
    Usuario_envio: string;

    @IsString()
    @IsOptional()
    Usuario_revision: string;

    @IsString()
    Estado: string;
}
