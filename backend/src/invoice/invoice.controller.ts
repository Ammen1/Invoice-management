/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto, EditInvoiceDto } from './dto';

@UseGuards(JwtGuard)
@Controller('invoices')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Get()
  getInvoices(@GetUser('id') userId: number) {
    return this.invoiceService.getInvoices(userId);
  }

  @Get(':id')
  getInvoiceById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) invoiceId: number,
  ) {
    return this.invoiceService.getInvoiceById(userId, invoiceId);
  }

  @Post()
  createInvoice(@GetUser('id') userId: number, @Body() dto: CreateInvoiceDto) {
    return this.invoiceService.createInvoice(userId, dto);
  }

  @Patch(':id')
  editInvoiceById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) invoiceId: number,
    @Body() dto: EditInvoiceDto,
  ) {
    return this.invoiceService.editInvoiceById(userId, invoiceId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteInvoiceById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) invoiceId: number,
  ) {
    return this.invoiceService.deleteInvoiceById(userId, invoiceId);
  }
}
