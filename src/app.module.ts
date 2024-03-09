import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {dataBaseConfig} from './database/database.config';
import {TypeOrmModule} from '@nestjs/typeorm';
import { DataSource} from 'typeorm';
import { CarSearcherModule } from './car-searcher/car-searcher.module';
import { CarsModule } from './cars/cars.module';
import { PublicationsRetrieverModule } from './publications-retriever/publications-retriever.module';
import { BotTelegramModule } from './bot-telegram/bot-telegram.module';
import { CarProcessorModule } from './car-processor/car-processor.module';
@Module({
    imports: [
        CarsModule,
        CarSearcherModule,
        TypeOrmModule.forRoot(dataBaseConfig),
        PublicationsRetrieverModule,
        BotTelegramModule,
        CarProcessorModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
}
