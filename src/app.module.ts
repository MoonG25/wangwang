import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CgvModule } from './cgv/cgv.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CgvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
