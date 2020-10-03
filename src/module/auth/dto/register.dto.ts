import { IsEmail, IsNotEmpty } from "class-validator"
import { RegisterData } from '../interface/register-data.interface'

export class RegisterDto implements RegisterData {

  @IsNotEmpty()
  namaPerusahaan: string

  @IsNotEmpty()
  npwpPerusahaan: string

  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  confirmPassword: string

  @IsNotEmpty()
  isAgree: boolean

}