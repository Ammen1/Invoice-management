/* eslint-disable prettier/prettier */
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateInvoiceItemDto {
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

export class CreateInvoiceDto {
  @IsNotEmpty()
  @IsString()
  issuerCompanyName: string;

  @IsNotEmpty()
  @IsString()
  issuerContactName: string;

  @IsNotEmpty()
  @IsString()
  issuerAddress: string;

  @IsNotEmpty()
  @IsString()
  issuerCity: string;

  @IsNotEmpty()
  @IsString()
  issuerCountry: string;

  @IsNotEmpty()
  @IsString()
  clientCompanyName: string;

  @IsNotEmpty()
  @IsString()
  clientAddress: string;

  @IsNotEmpty()
  @IsString()
  clientCity: string;

  @IsNotEmpty()
  @IsString()
  clientCountry: string;

  @IsNotEmpty()
  @IsString()
  invoiceNumber: string;

  @IsNotEmpty()
  @IsDateString()
  issueDate: string;

  @IsNotEmpty()
  @IsDateString()
  dueDate: string;

  @IsOptional()
  @IsString()
  companyLogoUrl?: string;

  // @IsNotEmpty()
  // @IsNumber()
  // totalAmount: number;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceItemDto)
  lineItems: CreateInvoiceItemDto[];
}
