import {IsNotEmpty, IsOptional, IsString, Length} from "class-validator";

export class UpdatePostDto {
    @IsString()
    @IsOptional()
    @Length(1, 30)
    title: string

    @IsString()
    @IsOptional()
    @Length(1, 100)
    shortDescription: number

    @IsString()
    @IsOptional()
    @Length(1, 1000)
    content: string

    @IsString()
    @IsNotEmpty()
    blogId: string
}
