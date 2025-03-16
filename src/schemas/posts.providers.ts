import { Connection } from 'mongoose';
import {PostSchema} from "./posts.schema";

export const postsProviders = [
    {
        provide: 'POST_MODEL',
        useFactory: (connection: Connection) => connection.model('Post', PostSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
