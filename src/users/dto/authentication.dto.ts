import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AutenticacionDto {

    @IsString() 
    Usuario: string;

    @IsString()
    @MinLength(6)
    @MaxLength(500)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    Contrasena: string;
}
