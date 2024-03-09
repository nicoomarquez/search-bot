import {Injectable, Logger} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {AxiosError, AxiosResponse} from "axios";
import {catchError, firstValueFrom, throwError} from 'rxjs';
@Injectable()
export class PublicationsRetrieverService {
    private readonly logger = new Logger(PublicationsRetrieverService.name);

    constructor(private readonly httpService: HttpService) {}

    async findAll(urls: string[]): Promise<string[]> {
        let results = [];
        for (const url of urls) {
            const { data } = await firstValueFrom(
                this.httpService.get(url).pipe(
                    catchError((error: AxiosError) => {
                        this.logger.error(error.response.data);
                        const err = new Error('An error happened!');
                        return throwError(() => err);
                    }),
                ),
            );
            results.push(data);
        }

        return results;
    }
}
