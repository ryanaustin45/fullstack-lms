import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { CoursesModule } from './courses/courses.module';
import { MaterialsModule } from './materials/materials.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { SchedulesModule } from './schedules/schedules.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // .env otomatis ke-load ke semua module
    PrismaModule,
    AuthModule,
    CategoriesModule,
    CoursesModule,
    MaterialsModule,
    EnrollmentsModule,
    LeaderboardModule,
    SchedulesModule,
  ],
})
export class AppModule {}
