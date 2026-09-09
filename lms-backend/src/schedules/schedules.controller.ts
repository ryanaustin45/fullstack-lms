import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@ApiTags('Schedules')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('schedules')
export class SchedulesController {
  constructor(private schedulesService: SchedulesService) {}

  @Get()
  async findAll(
    @Query('month') month?: number,
    @Query('year') year?: number,
    @Query('instructor_id') instructorId?: string,
  ) {
    const data = await this.schedulesService.findAll(
      month ? Number(month) : undefined,
      year ? Number(year) : undefined,
      instructorId,
    );
    return { success: true, data };
  }

  @Post()
  @Roles('admin', 'pemateri')
  async create(@CurrentUser() user, @Body() dto: CreateScheduleDto) {
    const data = await this.schedulesService.create(user.id, dto);
    return { success: true, data };
  }
}
