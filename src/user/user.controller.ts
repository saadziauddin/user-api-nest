import { Controller, Get, Post, Body, Param, UseGuards, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto';
import { UserResponseDto } from './dto/userResponseDto';
import { plainToInstance } from 'class-transformer';
import { AuthGuard } from '../authGuard/authGuard';
import { CustomException } from '../exceptions/customException';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @UseGuards(AuthGuard)
    @Get('')
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    getUser(@Param('id') id: string) {
        if (id < '0') {
            throw new NotFoundException('Invalid User ID');
        }
        else if (id == '0') {
            throw new CustomException();
        }
        else if (id == '100') {
            throw Error('');

        }
        return this.userService.getUser(Number(id));
    }

    //POST - Create a New User
    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        const user = this.userService.createUser(createUserDto);
        return plainToInstance(UserResponseDto, user, {
            excludeExtraneousValues: false,
        });
    }
}
