import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
export declare class EnrollmentsController {
    private enrollmentsService;
    constructor(enrollmentsService: EnrollmentsService);
    enroll(user: any, dto: CreateEnrollmentDto): Promise<{
        success: boolean;
        data: {
            id: string;
            status: import(".prisma/client").$Enums.EnrollmentStatus;
            courseId: string;
            userId: string;
            progress: number;
            enrolledAt: Date;
        };
    }>;
    updateProgress(id: string, dto: UpdateProgressDto): Promise<{
        success: boolean;
        data: {
            id: string;
            status: import(".prisma/client").$Enums.EnrollmentStatus;
            courseId: string;
            userId: string;
            progress: number;
            enrolledAt: Date;
        };
    }>;
    myEnrollments(user: any): Promise<{
        success: boolean;
        data: ({
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
        })[];
    }>;
}
