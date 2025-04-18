import {IsNotEmpty} from "class-validator";

export class CheckTokenDto {
  @IsNotEmpty()
  token: string
}
