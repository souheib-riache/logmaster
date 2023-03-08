import { registerEnumType } from '@nestjs/graphql';

export enum MediaType {
    image = 'image',
    video = 'video',
    audio = 'audio',
    document = 'document',
}

registerEnumType(MediaType, {
    name: 'MediaType',
    description: 'Media type',
});