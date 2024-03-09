import { Injectable } from '@nestjs/common';
import {CarSearcherService} from "../car-searcher/car-searcher.service";
import {BotTelegramService} from "../bot-telegram/bot-telegram.service";
import {CreateCarDto} from "../cars/dto/create-car.dto";
import {CarInterface} from "../cars/interfaces/car.interface";

@Injectable()
export class CarProcessorService {
    constructor(private carSearcherService: CarSearcherService, private botTelegramService: BotTelegramService) {}

    async process() {
        //const searchedCars = await this.carSearcherService.execute();
        const searchedCarsOriginal = await this.carSearcherService.execute();
        let searchedCars = {
            created: searchedCarsOriginal.created.slice(0, 2),
            updated: searchedCarsOriginal.created.slice(2, 4),
            deleted: searchedCarsOriginal.created.slice(4, 6)
        }
        let message = '';

        if (searchedCars.created.length > 0) {
            message += await this.getMessage(searchedCars.created, '🚗 Hay nuevas publicaciones disponibles 🚗\n\n');
        }
        if (searchedCars.deleted.length > 0) {
            if (message != '') {
                message += '=================================================\n\n';
            }
            message += await this.getMessage(searchedCars.deleted, '❌ Estas publicaciones ya no están disponibles ❌\n\n');
        }
        if (searchedCars.updated.length > 0) {
            if (message != '') {
                message += '=================================================\n\n';
            }
            message += await this.getMessage(searchedCars.updated, '🔁 Se han reactivado algunas publicaciones 🔁\n\n');
        }

        await this.notify(message.trimEnd());
        return '';
    }

    async getMessage(list: CreateCarDto[]|CarInterface[], messageAccumulator) {
        list.forEach(function (car: CreateCarDto|CarInterface, index: number) {
            messageAccumulator +=
                `${index+1}. <strong>${car.name}</strong>\n      💵 ${car.price} | 🛣 ${car.kms} |  📅  ${car.year} | 📍 ${car.location}\n    ${car.url}\n\n`;
        });

        return messageAccumulator;
    }

    async notify(message: string) {
        await this.botTelegramService.sendMessage('6193636179', message);
    }
}
