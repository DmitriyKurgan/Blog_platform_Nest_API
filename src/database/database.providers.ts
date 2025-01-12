import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: (): Promise<typeof mongoose> =>
            mongoose.connect('mongodb+srv://dimas:jcm9I93KGt526fpO@blogsplatform.mxifx0s.mongodb.net/?retryWrites=true&w=majority&appName=BlogsPlatform'),
    },
]
