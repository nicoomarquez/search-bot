import { Module } from '@nestjs/common';
import { BotTelegramController } from './bot-telegram.controller';
import { BotTelegramService } from './bot-telegram.service';
import { TelegramModule } from 'nestjs-telegram';

@Module({
  imports: [TelegramModule.forRoot({
    botKey: '7099487098:AAFfZ_Ng2lKnZSkoqq9ujCer4hOOik2mstg'
  })],
  controllers: [BotTelegramController],
  providers: [BotTelegramService],
  exports: [BotTelegramService]
})
export class BotTelegramModule {}
