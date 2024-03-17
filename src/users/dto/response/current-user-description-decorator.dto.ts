import { IsString } from "class-validator";

export class CurrentUserDescriptionDecoratorDto {
  @IsString()
  userId: string;
}
