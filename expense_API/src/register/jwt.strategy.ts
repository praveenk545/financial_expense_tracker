import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
// import { NewUser } from "./entities/new-user.entity";
import { RegisterUser } from "./entities/register.entity";
import { Repository } from "typeorm";
import { Request } from "express";
import { UnauthorizedException } from "@nestjs/common";

const cookieExtractor = (req) => {
   let token = null;
   if (req && req.cookies) {
     token = req.cookies.jwt;
   }
   console.log(token,"token")
   return token;
 };
// var cookieExtractor = function(req) {
//    var token = null;
//    if (req && req.cookies)
//    {
//        token = req.cookies['jwt'];
//    }
//    return token;
// };
export class JwtStrategy extends PassportStrategy(Strategy){
 constructor(@InjectRepository(RegisterUser) private repo:Repository<RegisterUser>){
   super(
      {
         ignoreExpiration: false,
      secretOrKey: 'secretKey',

      jwtFromRequest: ExtractJwt.fromExtractors([(request:Request)=>{
        console.log(request?.cookies?.Authentication)
        return request?.cookies.Authentication;
      }    ]),
      
    });
  }
  
 
 async validate(payload:any,req:Request){
    if(!payload){
        throw new UnauthorizedException('payload from  jwt strategy')
    }
    const user=await this.repo.findOne({where:{email:payload.email}})

    if(!user){
        throw new UnauthorizedException('user from jwt strategy');

    }
    req.user=user;
    return req.user;
 }

 async validateuser(payload: { sub: number, iat: number, exp: number, username: string }): Promise<{ userId: any; username: any }> {
   return { userId: payload.sub, username: payload.username };
 }
}
