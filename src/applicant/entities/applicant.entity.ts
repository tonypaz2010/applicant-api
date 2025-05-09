import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
 
@Entity()
export class Applicant {

    @PrimaryGeneratedColumn({
        name: "ID",
    })
    Id: number 

    @Column({
        name: "NOMBRE",
        type: "varchar",
        length: "100",
    })
    Nombre: string

    @Column({
        name: "APELLIDO",
        type: "varchar",
        length: "100",
    })
    Apellido: string    

    @Column({
        name: "CORREO",
        type: "varchar",
        length: "200",
    })
    Correo: string

    @Column({
        name: "GENERO",
        type: "varchar",
        length: "50",
    })
    Genero: string

    @Column({
        name: "EDAD",
        type: "varchar",
        length: "100",
    })
    Edad: string

    @Column({
        name: "IDENTIDAD",
        type: "varchar",
        length: "100",
    })
    Identidad: string

    @Column({
        name: "TELEFONO",
        type: "varchar",
        length: "100",
    })
    Telefono: string

    @Column({
        name: "PUESTO_APLICA",
        type: "varchar",
        length: "100",
    })
    Puesto_aplica: string

    @Column({
        name: "CIUDAD",
        type: "varchar",
        length: "100",
    })
    Ciudad: string

    @Column({
        name: "NIVEL_EDUCATIVO",
        type: "varchar",
        length: "100",
    })
    Nivel_educativo: string

    @Column({
        name: "EMPRESA",
        type: "varchar",
        length: "100",
    })
    Empresa: string

    @Column({
        name: "BILINGUE",
        type: "varchar",
        length: "100",
    })
    Bilingue: string

    @Column({
        name: "CURRICULUM",
        type: "varchar",
        length: "100",
    })
    Curriculum: string

    @CreateDateColumn({
        name: "FECHA_ENVIO",
        type: "date", 
    })
    Fecha_envio: Date = new Date(); 

    @UpdateDateColumn({
        name: "FECHA_REVISION",
        type: "date",
        nullable: true,
    })
    Fecha_revision: Date = new Date(); 

    @Column({
        name: "USUARIO_ENVIO",
        type: "varchar", 
        length: "100",
    })
    Usuario_envio: string

    @Column({
        name: "USUARIO_REVISION",
        type: "varchar",
        length: "100",
    })
    Usuario_revision: string

    @Column({
        name: "ESTADO",
        type: "char",
        length: "5",
    })
    Estado: string
}
