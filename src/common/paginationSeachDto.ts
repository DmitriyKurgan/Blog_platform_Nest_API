import { SortOrder } from 'mongoose';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { validateSync } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

enum SortDirectionType {
  ASC = 'ASC',
  DESC = 'DESC',
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

  @Transform(({ value }) => value.toUpperCase())
  @IsOptional()
  @IsEnum(SortDirectionType, {
    message: 'Sort direction must be either ASC or DESC',
  })
  sortDirection?: SortDirectionType = SortDirectionType.DESC;

  @IsOptional()
  sortBy?: string = 'createdAt';

  constructor(pagination: Partial<PaginationSearchDto>) {
    Object.assign(this, pagination)

    const errors = validateSync(this)
    if (errors.length > 0) {
      console.error(errors);
      throw new BadRequestException('Invalid pagination parameters')
    }
  }

  get skip(): number {
    return this.pageSize * (this.pageNumber - 1);
  }

  get order(): { [p: string]: string } {
    const field = this.sortBy && this.sortBy.trim() !== '' ? this.sortBy : 'createdAt';
    return {
      [field]: this.sortDirection === SortDirectionType.DESC ? 'desc' : 'asc',
    };
  }
}
