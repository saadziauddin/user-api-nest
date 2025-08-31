import { Expose, Exclude } from "class-transformer";

export class UserResponseDto {
    @Exclude()
    id: number;

    email: string;

    name: string;
}