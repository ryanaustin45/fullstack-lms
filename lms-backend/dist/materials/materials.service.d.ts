import { PrismaService } from '../prisma/prisma.service';
import { CreateMaterialDto } from './dto/create-material.dto';
export declare class MaterialsService {
    private prisma;
    constructor(prisma: PrismaService);
    findByCourse(courseId: string): import(".prisma/client").Prisma.PrismaPromise<{
        title: string;
        id: string;
        orderNo: number;
        courseId: string;
    }[]>;
    create(dto: CreateMaterialDto): import(".prisma/client").Prisma.Prisma__MaterialClient<{
        title: string;
        id: string;
        orderNo: number;
        courseId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__MaterialClient<{
        title: string;
        id: string;
        orderNo: number;
        courseId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
