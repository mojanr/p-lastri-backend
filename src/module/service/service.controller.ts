import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { ServiceService } from './service.service';

@Controller('service')
export class ServiceController {

  constructor(private serviceService: ServiceService) { }

  // get all service
  @Get()
  async getServices() {
    return this.serviceService.getServices()
  }

  // get all active service
  @Get('/status/active')
  async getActiveServices() {
    return this.serviceService.getActiveServices()
  }

  // create service
  @Post()
  async createService(@Body() newService: CreateServiceDto) {
    return this.serviceService.createService(newService)
  }

}
