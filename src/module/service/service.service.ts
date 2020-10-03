import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from 'src/database/entity/service.entity';
import { ServiceRepository } from 'src/database/repository/service.repository';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServiceService {

  constructor(@InjectRepository(ServiceRepository) private serviceRepo: ServiceRepository) { }

  // get all service
  async getServices(): Promise<Service[]> {
    return this.serviceRepo.find()
  }

  // get all active service
  async getActiveServices(): Promise<Service[]> {
    return this.serviceRepo.find({ active: true })
  }

  // create service
  async createService(serviceData: CreateServiceDto): Promise<Service> {
    const {
      name,
      description
    } = serviceData

    const newService = new Service()
    newService.name = name
    newService.description = description

    const result = newService.save()
    return result
  }

}
