import { Module } from '@nestjs/common';
import { CarProcessorService } from './car-processor.service';
import { CarProcessorController } from './car-processor.controller';
import {CarSearcherModule} from "../car-searcher/car-searcher.module";
import {BotTelegramModule} from "../bot-telegram/bot-telegram.module";

@Module({
  imports: [CarSearcherModule, BotTelegramModule],
  providers: [CarProcessorService],
  controllers: [CarProcessorController]
})
export class CarProcessorModule {}
