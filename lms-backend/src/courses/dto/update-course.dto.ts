import { PartialType } from '@nestjs/swagger';
import { CreateCourseDto } from './create-course.dto';

// PartialType membuat semua field CreateCourseDto jadi optional
// -> cocok untuk PUT/PATCH (update sebagian field)
export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
