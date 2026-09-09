import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsInt, IsOptional } from 'class-validator';

export class CreateMaterialDto {
  @ApiProperty()
  @IsUUID()
  course_id: string;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: false, default: 0 })
  @IsOptional()
  @IsInt()
  order_no?: number;
}
