import { PrismaService } from '../prisma/prisma.service';
export declare class EnrollmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    enroll(userId: string, courseId: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.EnrollmentStatus;
        courseId: string;
        userId: string;
        progress: number;
        enrolledAt: Date;
    }>;
    updateProgress(id: string, progress: number): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.EnrollmentStatus;
        courseId: string;
        userId: string;
        progress: number;
        enrolledAt: Date;
    }>;
    findMyEnrollments(userId: string): import(".prisma/client").Prisma.PrismaPromise<({
        course: {
            title: string;
            id: string;
            thumbnail: string | null;
        };
    } & {
        id: string;
        status: import(".prisma/client").$Enums.EnrollmentStatus;
        courseId: string;
        userId: string;
        progress: number;
        enrolledAt: Date;
    })[]>;
}
