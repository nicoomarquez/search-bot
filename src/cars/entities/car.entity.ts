import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import {CarInterface} from "../interfaces/car.interface";
@Entity({
    name: 'car'
})
export class Car implements CarInterface {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    year: string;

    @Column()
    price: string;

    @Column()
    kms: string;

    @Column()
    location: string;

    @Index({ unique: true })
    @Column()
    url: string;

    @Column({ default: 1 })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date
}
