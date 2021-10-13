import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { find, map } from 'rxjs';
import { CacheService } from 'src/cache/cache.service';
import { CGV_URL, COMING_SOON, SEPARATOR } from './cgv.constants';
import { ScheduleSearchDto } from './dto/schedule-search.dto';
import { SearchDto } from './dto/search.dto';
import { TheaterScheduleDto } from './dto/theater-schedule.dto';
import {JSDOM} from 'jsdom';

/**
 * @todo 받아온 데이터를 담을 클래스 만들기
 */
@Injectable()
export class CgvService {
  private readonly logger = new Logger(CgvService.name);

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
    return name + SEPARATOR + date;
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

  @Cron('45 * * * * *')
  async searching() {
    /*
        1. Redis에 저장된 키 목록 조회
        2. 현재 상영중인 데이터 조회
        3. 있는지 확인
        4. 있으면 Redis에서 제거 후 메세지 전송
    */
    const keys = await this.getSearchKeys();
    console.log(keys);
    this.logger.log('searching' + keys);
    return keys;
  }

  async comingSoon() {
    return await this.cacheService.get(COMING_SOON);
  }

  @Cron('0 0 * * * *')
  async searchingComingSoon() {
    try {
      const response = await this.httpService
        .get(`http://m.cgv.co.kr`)
        .pipe(map(res => res.data))
        .toPromise();

      const { window: { document }} = new JSDOM(response);

      const infoList = document.querySelectorAll(`
        ul.cgvMovieChartContainer 
          > li:last-child 
            > ul.cgvMovieChartContents 
              > li:first-child 
                .movieInfo
      `);

      const result = Array.from(infoList).map((item: any) => {
        const title = item.querySelector('p.cgbMovieTitle').textContent;
        const image = item.querySelector('a > img').getAttribute('data-src').split('|')[1];
        const dday = parseInt(item.querySelector('.movieDday').getAttribute('data-value'))
        return {
          title,
          image,
          dday
        }
      });

      this.cacheService.set(COMING_SOON, result);
    } catch (e) {
      console.error(e);
    }
  }
}
