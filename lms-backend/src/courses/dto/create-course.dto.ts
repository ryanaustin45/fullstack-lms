import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsUUID, IsDateString } from 'class-validator';
import { CourseStatus } from '@prisma/client';

export class CreateCourseDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Judul course tidak boleh kosong' })
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsUUID('4', { message: 'category_id harus UUID valid' })
  category_id: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID('4')
  instructor_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  thumbnail?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  start_date?: string;

  @ApiPropertyOptional({ enum: CourseStatus, default: 'draft' })
  @IsOptional()
  @IsEnum(CourseStatus)
  status?: CourseStatus;
}
