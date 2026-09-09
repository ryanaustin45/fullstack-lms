import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  course_id?: string;

  @ApiProperty({ example: '2025-04-04' })
  @IsDateString()
  event_date: string;

  @ApiProperty({ example: '14:30' })
  @IsNotEmpty()
  start_time: string;

  @ApiProperty({ example: '15:30' })
  @IsNotEmpty()
  end_time: string;
}
