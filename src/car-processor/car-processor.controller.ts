import {Controller, Get} from '@nestjs/common';
import {CarProcessorService} from "./car-processor.service";

@Controller('car-processor')
export class CarProcessorController {
    constructor(private readonly carProcessorService: CarProcessorService) {}

    @Get()
    async execute() {
        return await this.carProcessorService.process();
    }
}
