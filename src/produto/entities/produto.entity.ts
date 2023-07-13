import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity({name:'produto'})

export class Produto {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    type:string

    @Column()
    price:number

    @Column()
    size:string

    @Column()
    amount:number
}
