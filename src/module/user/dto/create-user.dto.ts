import { IsNotEmpty } from "class-validator";

export class CreateUserDto {

  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  roleId: string

  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  confirmPassword: string

}