import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common'
import { BanksUsersService } from './banks-users.service'
import { CreateBankUserDto } from './dto/create-bank-user.dto'
import { BankUser } from './bank-user.entity'
import { AuthGuard } from '@nestjs/passport'
import { Response } from 'express'

@Controller('banks-users')
@UseGuards(AuthGuard('jwt'))
export class BanksUsersController {
  constructor(private banksUsersService: BanksUsersService) {}

  @Get()
  async getBanksUser(@Req() req, @Res() res: Response) {
    const [result, count] = await this.banksUsersService.getBankUsers(
      req.user.id,
    )

    res.status(HttpStatus.OK).send({
      data: result,
      count: count,
    })
  }

  @Get('/:id')
  async getBankUserByid(@Param('id') id: string) {
    const result = await this.banksUsersService.getBankUserById(id)
    return {
      data: result,
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createBankUser(
    @Req() request,
    @Body() createBankUserDto: CreateBankUserDto,
    @Res() res: Response,
  ) {
    const user_id = request.user.id
    if (!user_id) {
      res.status(HttpStatus.UNAUTHORIZED).send({
        error: 'You are not authorized to access this API.',
        status: HttpStatus.UNAUTHORIZED,
      })
    }

    if (
      createBankUserDto.fullname !=
      request.user.first_name + ' ' + request.user.last_name
    ) {
      res.status(HttpStatus.UNAUTHORIZED).send({
        error:
          'Your first name or last name is not matched with our database, please review it. Otherwise if you think this is a mistake, please contact us.',
        status: HttpStatus.UNAUTHORIZED,
      })
    }

    try {
      const bankUser = createBankUserDto as BankUser
      bankUser.user_id = user_id
      const result = await this.banksUsersService.createBankUser(bankUser)
      res.status(HttpStatus.OK).send({
        data: result,
      })
    } catch (err) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .send({ error: err.message, status: HttpStatus.BAD_REQUEST })
    }
  }

  @Delete('/:id')
  deleteBankUser(@Param('id') id: string): Promise<void> {
    return this.banksUsersService.deleteBankUser(id)
  }
}
