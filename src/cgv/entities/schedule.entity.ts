/**
 * @todo 받아오는 데이터가 전부 string 이기때문에 변환처리 하기
 */
export class Schedule {
  id: number;
  theaterCode: number;
  thearerName: string;
  movieIdx: number;
  movieCode: number;
  playStartTime: string;  // hhmm
  playEndTime: string;    // hhmm
}