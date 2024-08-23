import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schemas';
import { Model } from 'mongoose';
import { Role } from './role.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret', // Ensure this matches your environment variable or config
    });
  }

  async validate(payload: any): Promise<User> {
    const { id, role } = payload; // Extract `role` from the payload
    console.log('Payload Roles:', role); // Add this for debugging

    const user = await this.userModel.findById(id);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Ensure the role is matched correctly
    if (!role.some((r: Role) => user.role.includes(r))) {
      throw new UnauthorizedException(
        "You don't have the necessary permissions to access this resource",
      );
    }

    return user;
  }
}
