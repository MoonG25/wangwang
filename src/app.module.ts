import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CgvModule } from './cgv/cgv.module';

@Module({
  imports: [
    CgvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
