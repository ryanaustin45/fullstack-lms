import { CourseStatus } from '@prisma/client';
export declare class CreateCourseDto {
    title: string;
    description?: string;
    category_id: string;
    instructor_id?: string;
    thumbnail?: string;
    start_date?: string;
    status?: CourseStatus;
}
