import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { PassportStrategy } from "@nestjs/passport";
import { Repository } from "typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";

import { Usuario } from "../entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { UnauthorizedException } from "@nestjs/common/exceptions/unauthorized.exception";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

    constructor(
        @InjectRepository( Usuario )
        private readonly userRepository: Repository<Usuario>,

        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }
    
    async validate( payload: JwtPayload): Promise<Usuario>{
        
        const { id } = payload;

        const user = await this.userRepository.findOneBy({ Id: id });

        if ( !user ) 
            throw new UnauthorizedException('Token no válido')
            
        if ( !user.Activo ) 
            throw new UnauthorizedException('Usuario está inactivo, reportar al administrador');
        
        return user;
    }
}