import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Headers } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, AutenticacionDto } from './dto/index'; 
import { PaginationDto } from '../commons/dtos/pagination.dto';
import { AuthGuard } from '@nestjs/passport';
import { ObtenerUsuario } from './decorators/obtener-usuario.decorator';  
import { Usuario } from './entities/user.entity';
import { IncomingHttpHeaders } from 'http';
import { Auth } from './decorators/auth.decorator';
import { ValidRoles } from './interfaces/valid-roles';

@ApiTags('Autenticacion - CRUD Usuarios')
@Controller('usuario')
export class UsersController {
  
  constructor(
    private readonly usuariosService: UsersService
  ) {}

  @Post('autenticacion')
  AuntenticacionUsuario(
    @Body() autenticacionDto: AutenticacionDto
    ) {
      return this.usuariosService.AuntenticacionUsuario(autenticacionDto);
    } 
    
 
  @Get('sesion')
  @Auth()
  AutenticacionEstado(
    @ObtenerUsuario() user: Usuario
  ) {
    return this.usuariosService.AutenticacionEstado( user );
  }
   
  @Post()
  //@Auth()
  @ApiResponse({ status: 201, description: 'Usuario creado', type: Usuario})
  @ApiResponse({ status: 400, description: 'Bad Request'})
  @ApiResponse({ status: 403, description: 'Forbidden, Token related'})
  CreaUsuario(
    @Body() createUsuarioDto: CreateUserDto
  ) {
    return this.usuariosService.CreaUsuario(createUsuarioDto);
  }

  @Get()
  FiltrarUsuarios(
    @Query() paginacionDto: PaginationDto
  ) {  
    return this.usuariosService.FiltrarUsuarios(paginacionDto);
  }

  @Get('private')
  @UseGuards( AuthGuard() )
  TestingPrivateRoute(
    //@Req() request: Express.Request,
    @ObtenerUsuario() User: Usuario, 
    @ObtenerUsuario('Correo') Correo: Usuario, 
     
    @Headers() headers: IncomingHttpHeaders,
    ) {      
    return {
      ok: true,
      message: 'Hola Mundo Private', 
      User,
      Correo,
      headers, 
    }
  }
 
  @Get('private3')
  @Auth( ValidRoles.admin )
  PrivateRoute3( 
    @ObtenerUsuario() user: Usuario,   
    ) {      
    return {
      ok: true, 
      user, 
    }
  }
  @Get(':id')
  FiltrarUsuario(
    @Param('id') id: number
  ) {
    return this.usuariosService.FiltrarUsuario( id );
  }



  @Patch(':id')
  ActualizaUsuario(
    @Param('id') id: number, 
    @Body() updateUsuarioDto: UpdateUserDto    
  ) { 
    return this.usuariosService.ActualizaUsuario(id, updateUsuarioDto);
  }

  @Delete(':id')
  @UseGuards( AuthGuard() )
  EliminaUsuario(@Param('id') id: number) {
    return this.usuariosService.EliminaUsuario( id );
  }
}
