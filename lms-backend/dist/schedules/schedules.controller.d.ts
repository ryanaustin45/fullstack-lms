import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
export declare class SchedulesController {
    private schedulesService;
    constructor(schedulesService: SchedulesService);
    findAll(month?: number, year?: number, instructorId?: string): Promise<{
        success: boolean;
        data: ({
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
        })[];
    }>;
    create(user: any, dto: CreateScheduleDto): Promise<{
        success: boolean;
        data: {
            title: string;
            id: string;
            instructorId: string;
            courseId: string | null;
            eventDate: Date;
            startTime: string;
            endTime: string;
        };
    }>;
}
