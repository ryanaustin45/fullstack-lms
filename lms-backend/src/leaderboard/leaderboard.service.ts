import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePointDto } from './dto/create-point.dto';

@Injectable()
export class LeaderboardService {
  constructor(private prisma: PrismaService) {}

  async getLeaderboard(courseId?: string, limit = 10) {
    // Jumlahkan total poin per user, per course (kalau difilter)
    const grouped = await this.prisma.userPoint.groupBy({
      by: ['userId', 'courseId'],
      where: courseId ? { courseId } : undefined,
      _sum: { points: true },
      orderBy: { _sum: { points: 'desc' } },
      take: limit,
    });

    const result = await Promise.all(
      grouped.map(async (item, index) => {
        const [user, course] = await Promise.all([
          this.prisma.user.findUnique({ where: { id: item.userId } }),
          this.prisma.course.findUnique({ where: { id: item.courseId } }),
        ]);
        return {
          rank: index + 1,
          user: { id: user?.id, name: user?.name },
          course: course?.title,
          points: item._sum.points ?? 0,
        };
      }),
    );

    return result;
  }

  givePoints(givenBy: string, dto: CreatePointDto) {
    return this.prisma.userPoint.create({
      data: {
        userId: dto.user_id,
        courseId: dto.course_id,
        points: dto.points,
        notes: dto.notes,
        givenBy,
      },
    });
  }
}
