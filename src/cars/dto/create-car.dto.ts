import {Column, Index} from "typeorm";

export class CreateCarDto {
    name: string;

    year: string;

    price: string;

    kms: string;

    location: string;

    url: string;
}
