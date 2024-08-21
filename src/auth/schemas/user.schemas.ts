import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
})
export class User {
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
}

export const UserSchema = SchemaFactory.createForClass(User);
