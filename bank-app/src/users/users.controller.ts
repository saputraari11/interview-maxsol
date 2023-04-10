import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'
import { Roles } from 'src/auth/roles.decorator'
import { RolesGuard } from 'src/auth/roles.guard'
import { BanksUsersService } from 'src/bank-users/banks-users.service'
import { FilterUserDto } from './dto/filter-user.dto'
import { UpdatePasswordDto } from './dto/update-password.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserLevel } from './user-level.enum'

import { UsersService } from './users.service'

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(
    private userService: UsersService,
    private bankUsersService: BanksUsersService,
  ) {}
  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserLevel.ADMIN)
  async getUsers(@Query(ValidationPipe) filterDto: FilterUserDto) {
    const { data, limit, page, total, count } = await this.userService.getUsers(
      filterDto,
    )
    return {
      data,
      limit: parseInt(limit + ''),
      page: parseInt(page + ''),
      total,
      count,
    }
  }

  @Get('/:id/banks')
  @UseGuards(AuthGuard('jwt'))
  async getUserBank(@Param('id') id: string) {
    const result = await this.bankUsersService.getBankUserByUserId(id)
    return {
      data: result,
    }
  }

  @Put('/change-profile')
  @UseGuards(AuthGuard('jwt'))
  async changeProfile(
    @Req() request,
    @Body() updateUserDto: UpdateUserDto,
    @Res() response,
  ) {
    const userId = request.user.id

    try {
      const result = await this.userService.updateUser(userId, updateUserDto)
      response.status(Number(200)).json({
        status: HttpStatus.OK,
        data: result,
      })
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      })
    }
  }

  @Put('/change-username')
  @UseGuards(AuthGuard('jwt'))
  async changeUsername(
    @Req() request: any,
    @Body() data: any,
    @Res() response: any,
  ) {
    try {
      const result = await this.userService.changeUsername(
        request.user.id,
        data.username,
      )
      response.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: result,
      })
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      })
    }
  }

  @Put('/change-password')
  @UseGuards(AuthGuard('jwt'))
  async changePassword(
    @Req() request,
    @Body() updateUserDto: UpdatePasswordDto,
    @Res() response,
  ) {
    const userId = request.user.id

    try {
      const { old_password, new_password } = updateUserDto
      const result = await this.userService.updatePassword(
        userId,
        old_password,
        new_password,
      )
      response.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: result,
      })
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      })
    }
  }
}
