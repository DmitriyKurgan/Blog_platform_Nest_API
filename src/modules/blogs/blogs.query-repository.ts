import {Inject, Injectable} from '@nestjs/common';
import { Model, SortOrder } from 'mongoose';
import {BlogDBModel} from "./types/getBlog";
import {BlogViewModel} from "./dto/getBlog";
import {FindAllBlogsDto} from "./queryDto/findAllblogsDto";
import { Paginated } from '../../common/paginated';

@Injectable()
export class BlogsQueryRepository {
    constructor(
      @Inject('BLOG_MODEL')
      private blogModel: Model<BlogDBModel>,
    ) {}

    async getBlogs(queryParams: FindAllBlogsDto): Promise<Paginated<BlogViewModel[]>> {

        const filter = queryParams.searchNameTerm ? { name: { $regex: queryParams.searchNameTerm, $options: 'i' } } : {}
        const sortOptions: Record<string, SortOrder> = queryParams.order as Record<string, SortOrder>;

        const [totalCount, items]: [number, BlogDBModel[]] = await Promise.all([
            this.blogModel.countDocuments(filter),
            this.blogModel
              .find(filter)
              .sort(sortOptions)
              .skip(queryParams.skip)
              .limit(queryParams.pageSize)
              .exec(),
        ]);

        return Paginated.getPaginated({
            items: items.map(i => new BlogViewModel(i)),
            count: totalCount,
            size: queryParams.pageSize,
            page: queryParams.pageNumber,
        })
    }

    async getBlogByID(blogID: string): Promise<BlogViewModel> {
        const blog = await this.blogModel.findById(blogID).exec()
        return new BlogViewModel(blog)
    }
}
