import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Content } from "./Content";


@Table
export class Title extends Model <Title,ITilteAttributs>{
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    declare title:string;

    @BelongsTo(()=> Content, {
        foreignKey: "contentId",
    })
    declare content: Content;
}

interface ITilteAttributs{
    title: string,
    contentId: number
}