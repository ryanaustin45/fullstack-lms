import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
export declare class MaterialsController {
    private materialsService;
    constructor(materialsService: MaterialsService);
    findByCourse(courseId: string): Promise<{
        success: boolean;
        data: {
            title: string;
            id: string;
            orderNo: number;
            courseId: string;
        }[];
    }>;
    create(dto: CreateMaterialDto): Promise<{
        success: boolean;
        data: {
            title: string;
            id: string;
            orderNo: number;
            courseId: string;
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
