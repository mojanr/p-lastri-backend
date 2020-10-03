import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ProviderInfo } from 'src/database/entity/provider-info.entity';
import { Provider } from 'src/database/entity/provider.entity';
import { ProviderRepository } from 'src/database/repository/provider.repository';
import { RoleRepository } from 'src/database/repository/role.repository';
import { UserRepository } from 'src/database/repository/user.repository';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { RegisterData } from './interface/register-data.interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(ProviderRepository) private providerRepo: ProviderRepository,
    @InjectRepository(RoleRepository) private roleRepo: RoleRepository,
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    private jwtService: JwtService
  ) { }

  // login user or provider
  async login(email: string, password: string): Promise<any> {
    const user = await this.userRepo.findOne({ where: { email: email, password: password }, relations: ['role', 'info'] })
    if (!user) {
      return {
        user: false
      }
    }
    return {
      // user,
      user: user,
      token: this.jwtService.sign({
        email: user.email,
        id: user.id,
      })
    }
  }

  // // register provider
  // @Transaction()
  // async register(registerData: RegisterData, @TransactionManager() manager?: EntityManager): Promise<Provider> {
  //   try {
  //     // get role
  //     let role = await this.roleRepo.findOneOrFail({ name: 'Provider' }).catch(error => { throw new NotFoundException() })

  //     let newProvider = new Provider()
  //     newProvider.username = registerData.email
  //     newProvider.email = registerData.email
  //     newProvider.setPassword(registerData.password)
  //     newProvider.role = role
  //     let result = await manager.save(newProvider)

  //     let newProviderInfo = new ProviderInfo()
  //     newProviderInfo.provider = newProvider
  //     newProviderInfo.name = registerData.namaPerusahaan
  //     newProviderInfo.npwp = registerData.npwpPerusahaan
  //     await manager.save(newProviderInfo)

  //     return result
  //   } catch (error) {
  //     console.log(error)
  //     throw new InternalServerErrorException(error)
  //   }
  // }
}
