import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';
import { LoginDto } from './dto/login-user-dto';
import * as bycrpt from 'bcryptjs'
import { Role } from './enum/roles.enum';

@Injectable()
export class AuthService {

  constructor(private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService) { }

  async login(data: LoginDto) {
    try {
      const user = await this.userRepository.findByEmailAndReturnPassword(data.email)
      if(!user){
        throw new UnauthorizedException()
      }

      const passwordMatch = await bycrpt.compare(data.password, user.password)
      if(!passwordMatch){
        throw new UnauthorizedException('Wrong Credentials')
      }

      const jwtToken = await this.jwtService.signAsync({
        userId: user.id,
        email: user.email,
        role: user.role
      },{
        expiresIn: '24h'
      })
      return {jwtToken}
    } catch (error) {
      throw new UnauthorizedException()
    }
  }
}
