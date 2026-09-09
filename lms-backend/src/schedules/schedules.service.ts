import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(private prisma: PrismaService) {}

  async findAll(month?: number, year?: number, instructorId?: string) {
    const where: any = {};
    if (instructorId) where.instructorId = instructorId;

    if (month && year) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59);
      where.eventDate = { gte: start, lte: end };
    }

    return this.prisma.schedule.findMany({
      where,
      include: {
        instructor: { select: { id: true, name: true } },
        course: { select: { id: true, title: true } },
      },
      orderBy: { eventDate: 'asc' },
    });
  }

  create(instructorId: string, dto: CreateScheduleDto) {
    return this.prisma.schedule.create({
      data: {
        instructorId,
        courseId: dto.course_id,
        title: dto.title,
        eventDate: new Date(dto.event_date),
        startTime: dto.start_time,
        endTime: dto.end_time,
      },
    });
  }
}
