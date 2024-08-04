/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInvoiceItemDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  unitPrice: number;

  @IsNotEmpty()
  @IsNumber()
  taxAmount: number;

  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;
}
