import { Controller, Get } from '@nestjs/common';
import { ProviderService } from './provider.service';

@Controller('provider')
export class ProviderController {

  constructor(private providerService: ProviderService) { }

  // get providers
  @Get()
  async getProviders() {
    return this.providerService.getProviders()
  }

  // register provider
  async register() {
    
  }
}
