import { Module } from '@nestjs/common';
import { HueController } from './hue.controller';
import { HueService } from './hue.service';

@Module({
  controllers: [HueController],
  providers: [HueService],
})
export class HueModule {}
