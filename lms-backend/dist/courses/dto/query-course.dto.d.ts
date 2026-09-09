import { CourseStatus } from '@prisma/client';
export declare class QueryCourseDto {
    search?: string;
    category_id?: string;
    status?: CourseStatus;
    page?: number;
    limit?: number;
}
