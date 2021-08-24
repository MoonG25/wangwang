import { IsString } from "class-validator";
import { RequestType, TheaterCode } from "../cgv.enum";

export class ScheduleSearchDto {
  @IsString()
  strId: string;

  @IsString()
  strMovieGroupCd: string;

  @IsString()
  strRequestType: RequestType;

  @IsString()
  strTheaterCd: TheaterCode;
}