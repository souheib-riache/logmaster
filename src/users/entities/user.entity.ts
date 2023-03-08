import { ObjectType, ID, Field } from '@nestjs/graphql';
import { RefreshToken } from 'src/auth/entities/refresh-token.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from 'typeorm';


@Entity('users')
@ObjectType()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    fullName: string;

    @Field()
    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {
        cascade: true,
    })
    refreshTokens: RefreshToken[];
}