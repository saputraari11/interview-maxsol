import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common'
import { BanksService } from './banks.service'
import { CreateBankDto } from './dto/create-bank.dto'
import { GetBanksFilterDto } from './dto/get-banks-filter.dto'
import { Bank } from './bank.entity'
import { AuthGuard } from '@nestjs/passport'

@Controller('banks')
@UseGuards(AuthGuard('jwt'))
export class BanksController {
  constructor(private banksService: BanksService) {}

  @Get()
  async getBanks(@Query(ValidationPipe) filterDto: GetBanksFilterDto) {
    const result = await this.banksService.getBanks(filterDto.queryFilter)

    return {
      data: result.bank,
      count: result.count,
    }
  }

  @Get('/:id')
  async getBankByid(@Param('id') id: string) {
    const result = await this.banksService.getBankById(id)
    return {
      data: result,
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createBank(@Body() createBankDto: CreateBankDto) {
    const bank: Bank = createBankDto as Bank
    const result = await this.banksService.createBank(bank)
    return {
      data: result,
    }
  }

  @Delete('/:id')
  deleteBank(@Param('id') id: string): Promise<void> {
    return this.banksService.deleteBank(id)
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updateBank(
    @Param('id') id: string,
    @Body() createBankDto: CreateBankDto,
  ) {
    const result = await this.banksService.updateBank(id, createBankDto)
    return {
      data: result,
    }
  }
}
