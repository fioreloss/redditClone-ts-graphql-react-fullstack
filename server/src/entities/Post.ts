import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Upvote } from "./Upvote";
import { User } from "./User";

@ObjectType()
@Entity()
export class Post extends BaseEntity{

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;


    @Field()
    @Column({type:'text'})
    title!: string;
    
    @Field()
    @Column({type:'text'})
    text!: string;

    @Field(()=>Int, {nullable:true})
    voteStatus: number | null;

    @Field()
    @Column({type:'int',default:0})
    points!: number;


    @Field()
    @Column()
    creatorId: number;

    @OneToMany(() => Upvote, (upvote) => upvote.user)
    upvotes: Upvote[];

    @Field()
    @ManyToOne(() => User, user => user.posts)
    creator: User;
    
    @Field(()=>String)
    @CreateDateColumn()
    createdAt : Date;

    @Field(()=>String)
    @UpdateDateColumn()
    updatedAt: Date;
}