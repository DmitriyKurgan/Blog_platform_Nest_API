import {Inject, Injectable} from '@nestjs/common';
import {Model} from "mongoose";
import {BlogDBModel} from "./types/getBlog";
import {BlogViewModel} from "./dto/getBlog";
import {FindAllBlogsDto} from "./queryDto/findAllblogsDto";

@Injectable()
export class BlogsQueryRepository {
    constructor(
        @Inject('BLOG_MODEL')
        private blogModel: Model<BlogDBModel>,
    ) {}

    // async getBlogs(queryParams): Promise<any> {
    //
    //     const { searchNameTerm, sortBy, sortDirection = 'desc', pageNumber, pageSize } = queryParams
    //
    //     const filter = searchNameTerm ? { name: { $regex: searchNameTerm, $options: 'i' } } : {}
    //     const sortOptions = { [sortBy]: sortDirection === 'asc' ? 1 : -1 } as any
    //     const skip = (pageNumber - 1) * pageSize;
    //
    //     const [totalCount, items] = await Promise.all([
    //         this.blogModel.countDocuments(filter),
    //         this.blogModel.find(filter).sort(sortOptions).skip(skip).limit(Number(pageSize)).exec()
    //     ] as any)
    //
    //     return {
    //         pagesCount: Math.ceil(totalCount / pageSize),
    //         page: pageNumber,
    //         pageSize,
    //         totalCount,
    //         items: items.map(BlogViewModel.getViewModel),
    //     }
    // }

    async getBlogs(queryParams: FindAllBlogsDto): Promise<any> {
        console.log('queryParams: ', queryParams)
        const { searchNameTerm, sortBy, sortDirection, pageNumber, pageSize } = queryParams


        const filter = searchNameTerm ? { name: { $regex: searchNameTerm, $options: 'i' } } : {}
        const sortOptions = { [sortBy]: sortDirection === 'asc' ? 1 : -1 } as any
        const skip = (pageNumber - 1) * pageSize

        console.log('Filter:', JSON.stringify(filter, null, 2))

        const [totalCount, items] = await Promise.all([
            this.blogModel.countDocuments(filter),
            this.blogModel.find(filter).sort(sortOptions).skip(skip).limit(Number(pageSize)).exec(),
        ] as any)

        console.log('Total Count:', totalCount, 'Page Size:', pageSize);

        return {
            pagesCount: Math.ceil(totalCount / (pageSize || 1)), // ✅ Защищаем от деления на 0
            page: pageNumber,
            pageSize,
            totalCount,
            items: items.map(BlogViewModel.getViewModel),
        }
    }

}
