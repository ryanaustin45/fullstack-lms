import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsUUID, Min } from 'class-validator';

export class CreatePointDto {
  @ApiProperty()
  @IsUUID()
  user_id: string;

  @ApiProperty()
  @IsUUID()
  course_id: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  points: number;

  @ApiPropertyOptional()
  @IsOptional()
  notes?: string;
}
