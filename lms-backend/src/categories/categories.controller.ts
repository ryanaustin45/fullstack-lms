import { Body, Controller, Get, Post, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async findAll() {
    const data = await this.categoriesService.findAll();
    return { success: true, data };
  }

  @Post()
  @Roles('admin', 'pemateri')
  @ApiOperation({ summary: 'Buat kategori baru' })
  async create(@Body() dto: CreateCategoryDto) {
    const data = await this.categoriesService.create(dto);
    return { success: true, message: 'Kategori berhasil dibuat', data };
  }

  @Put(':id')
  @Roles('admin', 'pemateri')
  @ApiOperation({ summary: 'Update kategori' })
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    const data = await this.categoriesService.update(id, dto);
    return { success: true, message: 'Kategori berhasil diupdate', data };
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Hapus kategori' })
  async remove(@Param('id') id: string) {
    const result = await this.categoriesService.remove(id);
    return { success: true, message: result.message };
  }
}