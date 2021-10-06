import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CacheModule } from 'src/cache/cache.module';
import { CgvController } from './cgv.controller';
import { CgvService } from './cgv.service';

@Module({
  imports: [HttpModule, CacheModule],
  controllers: [CgvController],
  providers: [CgvService],
})
export class CgvModule {}
