import { IsOptional } from 'class-validator';
import { PaginationSearchDto } from '../../../common/paginationSeachDto';

export class FindAllBlogsDto extends PaginationSearchDto {
    @IsOptional()
    searchNameTerm?: string | null = null
}
