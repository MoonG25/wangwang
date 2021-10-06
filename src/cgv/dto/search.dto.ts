import { IsDate, IsString } from "class-validator";

export class SearchDto {
  @IsString()
  name: string;

  @IsDate()
  screenDate: Date;
}