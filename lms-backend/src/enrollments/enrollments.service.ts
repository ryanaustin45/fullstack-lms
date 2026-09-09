import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async enroll(userId: string, courseId: string) {
    const existing = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
    if (existing) {
      throw new ConflictException('Kamu sudah terdaftar di course ini');
    }

    return this.prisma.enrollment.create({
      data: { userId, courseId },
    });
  }

  async updateProgress(id: string, progress: number) {
    const enrollment = await this.prisma.enrollment.findUnique({ where: { id } });
    if (!enrollment) throw new NotFoundException('Enrollment tidak ditemukan');

    return this.prisma.enrollment.update({
      where: { id },
      data: {
        progress,
        status: progress >= 100 ? 'completed' : 'active',
      },
    });
  }

  findMyEnrollments(userId: string) {
    return this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: { select: { id: true, title: true, thumbnail: true } },
      },
      orderBy: { enrolledAt: 'desc' },
    });
  }
}
