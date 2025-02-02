import {IsEnum, IsInt, IsOptional, Min} from "class-validator";
import {Transform} from "class-transformer";

export enum SortDirection {
    ASC = 'ASC',
    DESC = 'DESC',
}
export class FindAllBlogsDto {
    @IsOptional()
    searchNameTerm?: string = null;

    @IsOptional()
    sortBy?: string = 'createdAt';

    @IsOptional()
    @IsEnum(SortDirection)
    @Transform(({ value }) => (typeof value === 'string' ? value.toUpperCase() : SortDirection.DESC))
    sortDirection?: SortDirection = SortDirection.DESC

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(1)
    pageNumber?: number = 1

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(1)
    pageSize?: number = 10
}