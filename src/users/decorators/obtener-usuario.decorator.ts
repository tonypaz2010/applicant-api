import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';



export const ObtenerUsuario = createParamDecorator(
    ( data: string, context: ExecutionContext ) => {
         
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        
        if ( !user )
            throw new InternalServerErrorException('Usuario no encontrado (request)');
        
        return ( !data ) 
            ? user 
            : user[data];
        
    }
);