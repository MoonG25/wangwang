import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { find, map } from 'rxjs';
import { CacheService } from 'src/cache/cache.service';
import { CGV_URL } from './cgv.constants';
import { ScheduleSearchDto } from './dto/schedule-search.dto';
import { SearchDto } from './dto/search.dto';
import { TheaterScheduleDto } from './dto/theater-schedule.dto';

/**
 * @todo 받아온 데이터를 담을 클래스 만들기
 */
@Injectable()
export class CgvService {
  constructor(
    private readonly httpService: HttpService,
    private readonly cacheService: CacheService,
  ) {}

  async getScheduleSearchKey(scheduleSearch: ScheduleSearchDto) {
    const response = await this.httpService
      .post(`${CGV_URL}/ajaxTheaterScheduleList.aspx/GetScheduleSearchKey`, scheduleSearch)
      .pipe(map(res => res.data.d));
    return response;
  }

  async getTheaterScheduleList(theaterSchedule: TheaterScheduleDto) {
    const response = await this.httpService
      .post(`${CGV_URL}/ajaxTheaterScheduleList.aspx/GetTheaterScheduleList`, theaterSchedule)
      .pipe(map(res => res.data.d));
    return response;
  }

  async getScheduleDayList(data: any) {
    try {
      const response = await this.httpService
      .post(`${CGV_URL}/ajaxScheduleDayList.aspx/GetScheduleDayList`, data)
      .pipe(map(res => res.data.d));
      return response;
    } catch (e) {
      console.log(e);
      return { error: e }
    }
  }
  
  async getMiniMapData(data: any) {
    try {
      const response = await this.httpService
      .post(`${CGV_URL}/ajaxMovieMiniMapData.aspx/GetMiniMapData`, data)
      .pipe(map(res => res.data.d));
      return response;
    } catch (e) {
      console.log(e);
      return { error: e }
    }
  }

  async findTicket(data: any) {
    try {
      const response = await this.getTheaterScheduleList(data);
      // 결과값에서 해당 영화 찾기
      return response;
    } catch (e) {
      console.log(e);
      return { error: e }
    }
  }

  createKey(name: string, date: Date) {
    return name + date;
  }

  pad(value: number) {
    return ('0'+value).slice(-2)
  }

  now() {
    const date = new Date();
    const year = date.getFullYear();
    const month = this.pad(date.getMonth() + 1);
    const day = this.pad(date.getDate());
    return `${year}${month}${day}`
  }

  async addSearch(search: SearchDto) {
    const key = this.createKey(search.name, search.screenDate);
    const storedData = await this.cacheService.get(key);
    console.log('stored', storedData);
    if (storedData) {
    } else {
    }

    return await this.cacheService.set(key, {
      ...search,
      createdAt: +new Date()
    });
  }

  async getSearch(search: SearchDto) {
    const key = this.createKey(search.name, search.screenDate);
    return await this.cacheService.get(key);
  }

  async getSearchKeys() {
    return await this.cacheService.keys();
  }
}
