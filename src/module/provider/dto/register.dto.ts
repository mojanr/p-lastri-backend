import { IsNotEmpty } from "class-validator";

export class RegisterDto {

  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  npwp: string

  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  confirmPassword: string

}