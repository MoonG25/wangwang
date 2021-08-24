import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { CGV_URL } from './cgv.constants';
import { ScheduleSearchDto } from './dto/schedule-search.dto';
import { TheaterScheduleDto } from './dto/theater-schedule.dto';

/**
 * @todo 받아온 데이터를 담을 클래스 만들기
 */
@Injectable()
export class CgvService {
  constructor(private readonly httpService: HttpService) {}

  async getScheduleSearchKey(scheduleSearch: ScheduleSearchDto) {
    const response = await this.httpService
      .post(`${CGV_URL}/GetScheduleSearchKey`, scheduleSearch)
      .pipe(map(res => res.data.d));
    return response;
  }

  async getTheaterScheduleList(theaterSchedule: TheaterScheduleDto) {
    const response = await this.httpService
      .post(`${CGV_URL}/GetTheaterScheduleList`, theaterSchedule)
      .pipe(map(res => res.data.d));
    return response;
  }

  async getScheduleDayList(data: any) {
    try {
      const response = await this.httpService
      .post(`${CGV_URL}/GetScheduleDayList`, data)
      .pipe(map(res => res.data));
      return response;
    } catch (e) {
      console.log(e);
      return { error: e }
    }
  }

  async getMiniMapData(data: any) {
    try {
      const response = await this.httpService
      .post(`${CGV_URL}/GetMiniMapData`, data)
      .pipe(map(res => res.data));
      return response;
    } catch (e) {
      console.log(e);
      return { error: e }
    }
  }
}
