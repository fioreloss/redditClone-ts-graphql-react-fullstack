import { Post } from './Post';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity{

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToMany(() => Post, (post) => post.creator)
    posts: Post[];
    

    @Field()
    @Column({type:'text', unique:true})
    username!: string;

    @Field()
    @Column({ type:'text', unique: true })
    email!: string;
    
    @Column({type:'text'})
    password!: string;
    @Field(()=>String)
    @CreateDateColumn({type:'date'})
    createdAt :Date;

    @Field(()=>String)
    @UpdateDateColumn()
    updatedAt : Date;
}