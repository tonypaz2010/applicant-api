import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";

@Entity()
export class Usuario {
    
    @ApiProperty()
    @PrimaryGeneratedColumn({
        name: "ID",
    })
    Id: number; 

    @ApiProperty({
        example: 'Requerimientos',
        description: 'Nombre y Apellido',
        uniqueItems: true
    })
    @Column({
        name: "USUARIO",
        type: "varchar", 
        length: 50,
        unique: true,
    })
    Usuario: string;

    @ApiProperty({
        example: 'Requerimientos',
        description: 'Incluir caracteres especiales'
    })
    @Column({
        name: "CONTRASENA",
        select: true, 
    })
    Contrasena: string;

    @Column({
        name: "NOMBRE_COMPLETO",
        type: "varchar", 
        length: 150,
    })
    Nombre_Completo: string;

    @ApiProperty()
    @Column({
        name: "CORREO",
        type: "varchar", 
        length: 150,
        nullable: true
    })
    Correo: string;

    @ApiProperty()
    @Column({
        name: "ACTIVO",
        type: "boolean",
        default: true,
    })
    Activo: boolean;

    @ApiProperty()
    @CreateDateColumn({
        name: "REGISTRA_FECHA",
        type: "date", 
    })
    Registra_Fecha: Date;

    @ApiProperty()
    @UpdateDateColumn({
        name: "ACTUALIZA_FECHA",
        type: "date", 
        nullable: true,
    })
    Actualiza_Fecha: Date;

    @ApiProperty()
    @Column({
        name: "REGISTRA_USUARIO",
        type: "varchar", 
        length: 50,
    })
    Registra_Usuario: string;

    @ApiProperty()
    @Column({
        name: "ACTUALIZA_USUARIO",
        type: "varchar", 
        length: 50,
        nullable: true,
    })
    Actualiza_Usuario: string;

    @ApiProperty()
    @Column({
        name: "ROLES",
        type: "varchar", 
        length: 1000,
        nullable: true,
    })
    Roles: string;
}
