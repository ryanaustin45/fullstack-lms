import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// @Global supaya PrismaService bisa dipakai di module manapun
// tanpa perlu import ulang PrismaModule di tiap module.
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
