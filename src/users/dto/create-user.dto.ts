import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, MinLength, MaxLength, Matches, IsEmail, IsOptional, IsBoolean, IsDate } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        example: 'Usuario',
        description: 'Nombre y Apellido',
        uniqueItems: true
    })
    @IsString()
    @MinLength(6)
    Usuario: string;
    
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    Contrasena: string;

    @IsString()
    Nombre_Completo: string;
    
    @IsEmail()
    @IsOptional()
    Correo: string;
    
    @IsBoolean()
    Activo: boolean;

    @IsDate()
    @Type(() => Date) // Transforma la cadena a una instancia Date
    Registra_Fecha: Date; 

    @IsString()
    Registra_Usuario: string; 
    
    @IsDate()
    @Type(() => Date) // Transforma la cadena a una instancia Date
    Actualiza_Fecha: Date; 

    @IsString()
    Actualiza_Usuario: string; 
}
