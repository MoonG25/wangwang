import { Body, Controller, Post, Req } from '@nestjs/common';
import { CgvService } from './cgv.service';
import { ScheduleSearchDto } from './dto/schedule-search.dto';
import { TheaterScheduleDto } from './dto/theater-schedule.dto';

@Controller('cgv')
export class CgvController {
  constructor(private readonly cgvService: CgvService) {}

  @Post('schedule/key')
  getScheduleSearchKey(@Body() scheduleSearch: ScheduleSearchDto) {
    return this.cgvService.getScheduleSearchKey(scheduleSearch);
  }

  @Post('schedule/day')
  getScheduleDayList(@Body() data: any) {
    return this.cgvService.getScheduleDayList(data);
  }

  @Post('schedule')
  getTheaterScheduleList(@Body() theaterSchedule: TheaterScheduleDto) {
    return this.cgvService.getTheaterScheduleList(theaterSchedule);
  }

  @Post('ticket')
  findTicket(@Body() data: any) {
    return this.cgvService.findTicket(data);
  }

  @Post('map')
  getMiniMapData(@Body() data: any) {
    return this.cgvService.getMiniMapData(data);
  }
}
