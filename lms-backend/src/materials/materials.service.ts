import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMaterialDto } from './dto/create-material.dto';

@Injectable()
export class MaterialsService {
  constructor(private prisma: PrismaService) {}

  findByCourse(courseId: string) {
    return this.prisma.material.findMany({
      where: { courseId },
      orderBy: { orderNo: 'asc' },
    });
  }

  create(dto: CreateMaterialDto) {
    return this.prisma.material.create({
      data: {
        courseId: dto.course_id,
        title: dto.title,
        orderNo: dto.order_no ?? 0,
      },
    });
  }

  remove(id: string) {
    return this.prisma.material.delete({ where: { id } });
  }
}
