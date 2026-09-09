import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { QueryCourseDto } from './dto/query-course.dto';

@ApiTags('Courses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard) // urutan penting: cek token dulu, baru cek role
@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get()
  @ApiOperation({ summary: 'List courses (search + paginate)' })
  async findAll(@Query() query: QueryCourseDto) {
    const { data, meta } = await this.coursesService.findAll(query);
    return { success: true, data, meta };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detail course + materials' })
  async findOne(@Param('id') id: string) {
    const data = await this.coursesService.findOne(id);
    return { success: true, data };
  }

  @Post()
  @Roles('admin', 'pemateri')
  @ApiOperation({ summary: 'Buat course baru' })
  async create(@Body() dto: CreateCourseDto) {
    const data = await this.coursesService.create(dto);
    return { success: true, message: 'Course berhasil dibuat', data };
  }

  @Put(':id')
  @Roles('admin', 'pemateri')
  @ApiOperation({ summary: 'Update course' })
  async update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    const data = await this.coursesService.update(id, dto);
    return { success: true, message: 'Course berhasil diupdate', data };
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Hapus course' })
  async remove(@Param('id') id: string) {
    const result = await this.coursesService.remove(id);
    return { success: true, message: result.message };
  }
}
