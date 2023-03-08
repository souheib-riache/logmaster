import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLISODateTime, GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { AppContext } from './interfaces';

@Module({
    imports: [
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            imports: [AuthModule],
            useFactory: async (authService: AuthService) => ({
                autoSchemaFile: join(process.cwd(), '../../schema.gql'),
                debug: true,
                // installSubscriptionHandlers: true,
                playground: true,

                context: async ({ req }): Promise<AppContext> => {
                    let token = req.headers.authorization || '';
                    token = token.replace('Bearer ', '');
                    const user = await authService.resolveUser(token);

                    return { user };
                },
            }),
            inject: [AuthService],
            driver: ApolloDriver,

        }),


    ],
})
export class GraphqlModule { }
