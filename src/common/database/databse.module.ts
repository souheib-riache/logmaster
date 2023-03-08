import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '../config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const env = configService.get<string>('ENV');
                if (env == 'developpment') {
                    return {
                        type: 'postgres',
                        host: configService.get<string>('DB_TEST_HOST'),
                        port: configService.get<number>('DB_TEST_PORT'),
                        username: configService.get<string>('DB_TEST_USER'),
                        password: configService.get<string>('DB_TEST_PASSWORD'),
                        database: configService.get<string>('DB_TEST_NAME_DEV'),
                        autoLoadEntities: true,
                        synchronize: true,
                    };
                }
                return {
                    type: 'postgres',
                    host: configService.get<string>('DB_HOST'),
                    port: configService.get<number>('DB_PORT'),
                    username: configService.get<string>('DB_USER'),
                    password: configService.get<string>('DB_PASSWORD'),
                    database: configService.get<string>('DB_NAME_DEV'),
                    autoLoadEntities: true,
                    synchronize: true,
                };
            },
        }),
    ],
})
export class DatabaseModule { }
