import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcryptjs';

import { CreateUserDto, UpdateUserDto, AutenticacionDto } from './dto/index'; 
import { Usuario } from './entities/user.entity';
import { PaginationDto } from '../commons/dtos/pagination.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class UsersService {

  private readonly logger = new Logger('UsuariosService') 

  constructor(    

    @InjectRepository( Usuario )

    private readonly usuarioRepository: Repository<Usuario>, 
    private readonly jwtService: JwtService, 
  ){}
  
  private ObtenerToken( payload: JwtPayload ) {

    const token = this.jwtService.sign( payload );
    return token;

  }

  async AuntenticacionUsuario(autenticacionDto: AutenticacionDto) {
    
    const { Usuario, Contrasena } = autenticacionDto 

    const usuario = await this.usuarioRepository.findOne({
      where: { Usuario },
      select: { Id: true, Usuario: true, Contrasena: true, Nombre_Completo: true, Roles: true, Activo: true }
    }) 

    const { Contrasena: ContrasenaData, ...usuario_aut } = usuario;
     
    if( ! usuario_aut )
      throw new UnauthorizedException('Credenciales no válidas') 
    
    if ( !bcrypt.compareSync( Contrasena, usuario.Contrasena ) )
      throw new UnauthorizedException('Credenciales no válidas') 

      return {
        ...usuario_aut,
        token: this.ObtenerToken({ id: usuario.Id })
      }
 
  }

  async AutenticacionEstado( usuario: Usuario ){

    const { Contrasena: ContrasenaData, ...usuario_aut } = usuario;

    return {
      ...usuario_aut,
      token: this.ObtenerToken({ id: usuario.Id })
    };

  } 

  async CreaUsuario(createUsuarioDto: CreateUserDto) {

    try { 

      const { Contrasena, ...usuarioInfo } = createUsuarioDto

      const usuario = this.usuarioRepository.create({ 
        ...usuarioInfo,
        Contrasena: bcrypt.hashSync(Contrasena, 10)
      });

      await this.usuarioRepository.save(usuario);
      delete usuario.Contrasena;
      
      return {
        usuario,
        token: this.ObtenerToken({ id: usuario.Id })
      };

    } catch (error) {  
      this.handleDBExceptions(error)
    } 
  }

  async ActualizaUsuario(Id: number, updateUsuarioDto: UpdateUserDto) { 
 
    const usuario = await this.usuarioRepository.preload({
      Id: Number(Id),
      ...updateUsuarioDto
    }) 
    
    if ( !usuario ) 
      throw new NotFoundException(`Usuario con ID: ${ Id } no encontrado`);

      try { 
        await this.usuarioRepository.save( usuario );
        return usuario;

      } catch (error) {
        this.handleDBExceptions(error);      
      }
  }

  async EliminaUsuario(id: number) {
    const usuario = await this.FiltrarUsuario( id )
    await this.usuarioRepository.remove( usuario ) 
  }

  async FiltrarUsuarios( paginacionDto: PaginationDto ) {

    const { limit = 10, offset = 0 } = paginacionDto; 
    
    const usuarios = await this.usuarioRepository.find({
      take: limit,
      skip: offset, 
    })
    //console.log(usuarios)
    return usuarios.map( ( usuario ) => usuario )    
  }

  async FiltrarUsuario(Id: number) {
    
    const usuario = await this.usuarioRepository.findOneBy({ Id });
    
    if( !usuario )
      throw new NotFoundException(`Usuario con ID ${ Id } no encontrado`)

    return usuario 
  }

  private handleDBExceptions( error: any ) {

    if ( error.number === 2627 || error.number === 2601 ){
      throw new BadRequestException(error.message);
    
      this.logger.error(error)     
      throw new InternalServerErrorException('Unexpected error, check server logs');
    }  
  }
}
