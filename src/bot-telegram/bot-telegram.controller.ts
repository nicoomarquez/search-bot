import {Body, Controller, Get, Post} from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { BotTelegramService } from './bot-telegram.service';
import {Update} from "nestjs-telegram/dist/interfaces/telegramTypes.interface";
@Controller('bot-telegram')
export class BotTelegramController {
    constructor(private telegramService: BotTelegramService) { }

    @Get()
    test() {
        return 'test';
    }

    @Post()
    sendMessage(@Body() messageDto: MessageDto) {
        console.log('sendMessage', messageDto)
        return this.telegramService.sendMessage(messageDto.chatId, messageDto.message);
    }

    @Post('webwook')
    webhook(@Body() update: Update) {
        console.log(update);
    }

    @Post('setwebhook')
    setWebhook(@Body('url') url: string) {
        console.log(url);
    }
}
