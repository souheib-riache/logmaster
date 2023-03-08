import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SoftDeleteBaseEntity } from '../../../common/base/entities';
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { MediaType } from '../enums/media.enum';
import { News } from 'src/news/entities/news.entity';
import { Partners } from 'src/partners/entities';
import { HomePage } from 'src/home-page/entities/home-page.entity';

@ObjectType()
@Entity('media')
@Index(['original_name', 'file_name'], { unique: true })
export class Media extends SoftDeleteBaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    original_name: string;

    @Field()
    @Column({ unique: true })
    file_name: string;

    @Field()
    @Column()
    path: string;

    @Field()
    @Column()
    host: string;

    @Field()
    @Column()
    full_url: string;

    @Field(() => MediaType, { nullable: true })
    @Column({ enum: MediaType, type: 'varchar' })
    type: string;

    @Field()
    @Column()
    alt: string;

}
