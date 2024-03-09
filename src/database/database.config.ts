import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {Car} from "../cars/entities/car.entity";


export const dataBaseConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: '.db/data.sqlite3',
    entities: [Car],
    synchronize: true,
};