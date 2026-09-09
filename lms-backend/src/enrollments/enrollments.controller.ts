import { Controller, Post, Patch, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';

@ApiTags('Enrollments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private enrollmentsService: EnrollmentsService) {}

  @Post()
  async enroll(@CurrentUser() user, @Body() dto: CreateEnrollmentDto) {
    const data = await this.enrollmentsService.enroll(user.id, dto.course_id);
    return { success: true, data };
  }

  @Patch(':id/progress')
  async updateProgress(@Param('id') id: string, @Body() dto: UpdateProgressDto) {
    const data = await this.enrollmentsService.updateProgress(id, dto.progress);
    return { success: true, data };
  }

  @Get('me')
  async myEnrollments(@CurrentUser() user) {
    const data = await this.enrollmentsService.findMyEnrollments(user.id);
    return { success: true, data };
  }
}
