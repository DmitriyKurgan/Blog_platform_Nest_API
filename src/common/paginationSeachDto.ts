import { SortOrder } from 'mongoose';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';

enum SortDirectionType {
  ASC = 'ASC',
  DESC = 'DESC'
}

export class PaginationSearchDto {
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  pageNumber: number = 1;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  pageSize: number = 10;

  @IsOptional()
  @IsEnum(SortDirectionType)
  sortDirection?: SortDirectionType = SortDirectionType.DESC;

  sortBy?: string = 'createdAt';

  get skip(): number {
    return this.pageSize * (this.pageNumber - 1);
  }

  get order(): Record<string, SortOrder> {
    return {
      [this.sortBy || 'createdAt']: this.sortDirection === SortDirectionType.DESC ? 'desc' : 'asc',
    };
  }

  constructor(pagination: Partial<PaginationSearchDto>) {
    Object.assign(this, pagination);
  }

}
