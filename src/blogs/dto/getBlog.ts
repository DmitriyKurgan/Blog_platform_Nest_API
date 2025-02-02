import {BlogDBModel} from "../types/getBlog";

export class BlogViewModel {
    id: string
    name: string
    description: number
    websiteUrl: string
    createdAt: Date
    isMembership: boolean
    constructor(blog: BlogDBModel) {
        this.id = blog._id.toString()
        this.name = blog.name
        this.description = blog.description
        this.websiteUrl = blog.websiteUrl
        this.createdAt = blog.createdAt
        this.isMembership = blog.isMembership
    }
    static getViewModel(blog: BlogDBModel) : BlogViewModel {
        const result: BlogViewModel = {} as BlogViewModel
        result.id = blog._id.toString()
        result.name = blog.name
        result.description = blog.description
        result.websiteUrl = blog.websiteUrl
        result.createdAt = blog.createdAt
        result.isMembership = blog.isMembership
        return result
    }
}
