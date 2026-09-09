import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

// DTO = Data Transfer Object, mirip Form Request di Laravel.
// Validasi otomatis dijalankan oleh ValidationPipe global di main.ts.
export class RegisterDto {
  @ApiProperty({ example: 'Juliana' })
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  name: string;

  @ApiProperty({ example: 'juliana@mail.com' })
  @IsEmail({}, { message: 'Format email tidak valid' })
  email: string;

  @ApiProperty({ example: 'Password123!' })
  @MinLength(6, { message: 'Password minimal 6 karakter' })
  password: string;

  @ApiProperty({ example: 'peserta', enum: Role, required: false })
  @IsEnum(Role, { message: 'Role tidak valid' })
  role?: Role;
}
