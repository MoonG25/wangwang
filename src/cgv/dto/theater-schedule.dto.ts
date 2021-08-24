import { IsString } from "class-validator";
import { RankType, RequestType, TheaterCode } from "../cgv.enum";

export class TheaterScheduleDto {
  @IsString()
  strMovieGroupCd: string;

  @IsString()
  strMovieTypeCd: string;

  @IsString()
  strPlayYMD: string;

  @IsString()
  strRankType: RankType;

  @IsString()
  strRequestType: RequestType;

  @IsString()
  strScreenTypeCd: string;

  @IsString()
  strTheaterCd: TheaterCode;

  @IsString()
  strUserID: string;
}