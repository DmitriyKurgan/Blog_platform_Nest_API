import { Connection } from 'mongoose';
import {BlogSchema} from "./blogs.schema";

export const blogsProviders = [
    {
        provide: 'BLOG_MODEL',
        useFactory: (connection: Connection) => connection.model('Blog', BlogSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
