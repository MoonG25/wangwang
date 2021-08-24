import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CgvController } from './cgv.controller';
import { CgvService } from './cgv.service';

@Module({
  imports: [HttpModule],
  controllers: [CgvController],
  providers: [CgvService],
})
export class CgvModule {}
