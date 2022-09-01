import { Controller, Get } from '@nestjs/common';
import { HueService } from './hue.service';

@Controller('hue')
export class HueController {
  constructor(private hueService: HueService) {}

  @Get('relax')
  async relax() {
    return this.hueService.activateRelax();
  }

  @Get('energize')
  async energize() {
    return this.hueService.activateEnergize();
  }

  @Get('toggle')
  async toggle() {
    return this.hueService.toggleLamps();
  }
}
