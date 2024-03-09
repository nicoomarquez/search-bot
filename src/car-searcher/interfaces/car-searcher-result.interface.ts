import {CreateCarDto} from "../../cars/dto/create-car.dto";
import {CarInterface} from "../../cars/interfaces/car.interface";

export interface CarSearcherResultInterface {
    created: CreateCarDto[],
    updated: CreateCarDto[],
    deleted: CarInterface[]
}