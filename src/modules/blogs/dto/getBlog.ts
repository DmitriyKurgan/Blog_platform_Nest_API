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
}
