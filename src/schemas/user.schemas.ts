import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../auth/role.enum';
@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({
    required: [true, 'Name is required'],
  })
  name: string;

  @Prop({
    required: [true, 'Email is required'],
    unique: [true, 'Email must be unique'],
  })
  email: string;

  @Prop({
    required: [true, 'Password is required'],
  })
  password: string;

  @Prop({
    type: [String],
    enum: Role,
    default: [Role.Admin],
  })
  role: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
