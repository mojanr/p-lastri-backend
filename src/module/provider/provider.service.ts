import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProviderInfo } from 'src/database/entity/provider-info.entity';
import { Provider } from 'src/database/entity/provider.entity';
import { ProviderRepository } from 'src/database/repository/provider.repository';
import { RoleRepository } from 'src/database/repository/role.repository';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class ProviderService {

  constructor(
    @InjectRepository(ProviderRepository) private providerRepo: ProviderRepository,
    @InjectRepository(RoleRepository) private roleRepo: RoleRepository
  ) { }

  // get all provider
  async getProviders() {
    return this.providerRepo.find({ relations: ['role', 'info'], order: { createdDate: 'ASC' } })
  }

  // register
  @Transaction()
  async register(registerData: RegisterDto, @TransactionManager() manager?: EntityManager): Promise<Provider> {
    // destruct
    const {
      name,
      npwp,
      email,
      password
    } = registerData

    // get role 
    const role = await this.roleRepo.findOne({ name: 'Provider' }).catch(error => { throw new NotFoundException() })
  
    // new provider info
    const newProviderInfo = new ProviderInfo()
    newProviderInfo.name = name
    newProviderInfo.npwp = npwp
    const resultNewProviderInfo = await manager.save(newProviderInfo)

    // new provider
    const newProvider = new Provider()
    newProvider.username = email
    newProvider.email = email
    newProvider.password = password
    newProvider.role = role
    newProvider.info = newProviderInfo
    const resultNewProvider = await manager.save(newProvider)

    // return new provider created
    return resultNewProvider
  }
}
