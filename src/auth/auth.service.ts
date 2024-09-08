import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private readonly userRepository: UserRepository){}

    async login(data: LoginDto){
        const user = await this.userRepository.findByEmailAndPassword(data.email);
        if(!user) {
            throw new UnauthorizedException(`The data provided is incorrect`);
        }

        if (user.lockedDate) {
            const now = new Date();
            const thirtyMinutesInMs = 30 * 60 * 1000;
        
            if (now.getTime() - new Date(user.lockedDate).getTime() > thirtyMinutesInMs) {
              await this.userRepository.unlockedUser(user.id);
            } else {
                throw new UnauthorizedException(`User is locked and will be unlocked in 30 minutes`);
            }
        }

        const isPassword = await bcrypt.compare(data.password, user.password);
        if (!isPassword) {
            await this.userRepository.incrementAttempts(user.id);
            
            if (user.loginAttempts >= 3) {
              await this.userRepository.lockedDate(user.id);
              throw new UnauthorizedException(`User is locked and will be unlocked in 30 minutes`);
            }
        
            throw new UnauthorizedException(`The data provided is incorrect`);
        }

        await this.userRepository.resetIncrementAttempts(user.id);

        delete user.password;

        return user;
    }

}
