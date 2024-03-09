import {Injectable} from '@nestjs/common';
import * as cheerio from "cheerio";
import {UrlHelper} from "./url.helper";
import {PublicationsRetrieverService} from "../publications-retriever/publications-retriever.service";
import {CarsService} from "../cars/cars.service";
import {CreateCarDto} from "../cars/dto/create-car.dto";
import {CarInterface} from "../cars/interfaces/car.interface";
import {CarSearcherResultInterface} from "./interfaces/car-searcher-result.interface";

@Injectable()
export class CarSearcherService {
    constructor(private urlHelper: UrlHelper, private publicationsRetrieverService: PublicationsRetrieverService, private carsService: CarsService) {}

    async execute(): Promise<CarSearcherResultInterface> {
        const urls = this.urlHelper.getSearchableValues();
        const
            carsUpdated: CreateCarDto[] = [],
            carsDeleted: CarInterface[] = [],
            carsCreated: CreateCarDto[] = [];

        try {
            const
                carIdsPersisted: number[] = (await this.carsService.findAll()).map(car => car.id),
                carIdsAvailables: number[] = [];

            console.log('carIdsPersisted', carIdsPersisted);

            for (const response of (await this.publicationsRetrieverService.findAll(urls))) {
                const $ = cheerio.load(response);
                const elements = $('.ui-search-result').get();

                for (const element of elements) {
                    const carResult: CreateCarDto = await this.processSearchResult($, element);

                    const car: CarInterface|null = await this.carsService.findByUrl(carResult.url);

                    if (car === null) {
                        carsCreated.push(carResult);
                    }
                    else if (!car.isActive) {
                        car.isActive = true;
                        carsUpdated.push(carResult);
                        carIdsAvailables.push(car.id);
                    }
                    else {
                        carIdsAvailables.push(car.id);
                    }
                }
            }

            const carsNotAvailable: number[] = carIdsPersisted.filter(id => !carIdsAvailables.includes(id));
            console.log('carsNotAvailable', carsNotAvailable);

            for (const carIdNotAvailable of carsNotAvailable) {
                carsDeleted.push(await this.carsService.remove(carIdNotAvailable));
            }
        } catch (error) {
            throw new Error(`Error en la solicitud: ${error.message}`);
        }

        return {
            created: carsCreated,
            updated: carsUpdated,
            deleted: carsDeleted
        };
    }

    private async processSearchResult($, element): Promise<CreateCarDto> {
        try {
            const domElement = $(element);
            const listContent: string[] = [];
            const parsedUrl = new URL(domElement.find('.ui-search-link').attr('href') as string);

            domElement
                .find('.ui-search-item__group--attributes > ul')
                .children('li')
                .each((index, item) => {
                    listContent.push($(item).text());
                });

            return {
                name: domElement.find('.ui-search-item__title').text(),
                price: domElement
                    .find(
                        '.ui-search-item__group--price.ui-search-item__group--price-grid-container > div > div > div > span',
                    )
                    .text(),
                year: listContent[0],
                kms: listContent[1],
                location: domElement.find('.ui-search-item__group--location > span').text(),
                url: `${parsedUrl.origin}${parsedUrl.pathname}`,
            };
        } catch (error) {
            console.error('Error processing search result:', error);
            throw error;
        }
    }
}
