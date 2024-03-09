import {Injectable} from '@nestjs/common';
import {TelegramSendMessageParams, TelegramService} from 'nestjs-telegram';

@Injectable()
export class BotTelegramService {
    constructor(private telegram: TelegramService) {
    }

    sendMessage(chatId: string, text: string) {

        const params: TelegramSendMessageParams = {
            chat_id: chatId,
            parse_mode: 'html',
            text: text
        };

        // this.telegram.sendMessage(params).subscribe((result) => {
        //     console.log(result)
        // },((error: any) => {
        //     console.log(error)
        // }));
    }
}
