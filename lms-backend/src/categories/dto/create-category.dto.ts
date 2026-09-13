import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Pemrograman' })
  @IsNotEmpty({ message: 'Nama kategori tidak boleh kosong' })
  name: string;

  @ApiPropertyOptional({ example: 'pemrograman' })
  @IsOptional()
  slug?: string;
}