import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { LeaderboardService } from './leaderboard.service';
import { CreatePointDto } from './dto/create-point.dto';

@ApiTags('Leaderboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('leaderboard')
export class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) {}

  @Get()
  async getLeaderboard(@Query('course_id') courseId?: string, @Query('limit') limit?: number) {
    const data = await this.leaderboardService.getLeaderboard(courseId, limit ? Number(limit) : 10);
    return { success: true, data };
  }

  @Post()
  @Roles('admin', 'pemateri')
  async givePoints(@CurrentUser() user, @Body() dto: CreatePointDto) {
    const data = await this.leaderboardService.givePoints(user.id, dto);
    return { success: true, data };
  }
}
