import { PrismaService } from '../prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
export declare class SchedulesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(month?: number, year?: number, instructorId?: string): Promise<({
        course: {
            title: string;
            id: string;
        } | null;
        instructor: {
            name: string;
            id: string;
        };
    } & {
        title: string;
        id: string;
        instructorId: string;
        courseId: string | null;
        eventDate: Date;
        startTime: string;
        endTime: string;
    })[]>;
    create(instructorId: string, dto: CreateScheduleDto): import(".prisma/client").Prisma.Prisma__ScheduleClient<{
        title: string;
        id: string;
        instructorId: string;
        courseId: string | null;
        eventDate: Date;
        startTime: string;
        endTime: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
