import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import { Title } from "./Title";


@Table
export class Content extends Model <Content,IContentAttributs>{
    @Column({
        type: DataType.JSONB,
        allowNull: false
    })
    declare content: JSON

    @Column({
        type: DataType.INTEGER,
        allowNull:true,
        primaryKey: true,
        unique: true
    })
    declare contentId: number

    @HasOne(()=>Title,{
        foreignKey:"TitleId"
    })
    declare title: Title
}

interface IContentAttributs{
    content: IContentType,
    titleId: number
}

interface IContentType {
    [key:string]:any
}