import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';

@ApiTags('Materials')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('materials')
export class MaterialsController {
  constructor(private materialsService: MaterialsService) {}

  @Get()
  async findByCourse(@Query('course_id') courseId: string) {
    const data = await this.materialsService.findByCourse(courseId);
    return { success: true, data };
  }

  @Post()
  @Roles('admin', 'pemateri')
  async create(@Body() dto: CreateMaterialDto) {
    const data = await this.materialsService.create(dto);
    return { success: true, data };
  }

  @Delete(':id')
  @Roles('admin', 'pemateri')
  async remove(@Param('id') id: string) {
    await this.materialsService.remove(id);
    return { success: true, message: 'Materi berhasil dihapus' };
  }
}
