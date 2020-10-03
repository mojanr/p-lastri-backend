import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from '../provider/dto/register.dto';
import { ProviderService } from '../provider/provider.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService, private providerService: ProviderService) { }

  // login
  @Post('/login')
  async login(@Body() loginData: LoginDto) {
    // destruct
    const {
      email,
      password
    } = loginData
    return this.authService.login(email, password)
  }

  // register provider
  @Post('/register')
  async registerProvider(@Body() registerData: RegisterDto) {
    return this.providerService.register(registerData)
  }
}
