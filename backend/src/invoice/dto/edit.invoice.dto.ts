/* eslint-disable prettier/prettier */
import {
  IsDateString,
  IsOptional,
  IsString,
  IsNumber,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class EditInvoiceItemDto {
  @IsOptional()
  @IsNumber()
  id?: number; // Add id to allow updates

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsNumber()
  unitPrice?: number;

  @IsOptional()
  @IsNumber()
  taxAmount?: number;

  @IsOptional()
  @IsNumber()
  totalAmount?: number;
}

export class EditInvoiceDto {
  @IsOptional()
  @IsString()
  issuerCompanyName?: string;

  @IsOptional()
  @IsString()
  issuerContactName?: string;

  @IsOptional()
  @IsString()
  issuerAddress?: string;

  @IsOptional()
  @IsString()
  issuerCity?: string;

  @IsOptional()
  @IsString()
  issuerCountry?: string;

  @IsOptional()
  @IsString()
  clientCompanyName?: string;

  @IsOptional()
  @IsString()
  clientAddress?: string;

  @IsOptional()
  @IsString()
  clientCity?: string;

  @IsOptional()
  @IsString()
  clientCountry?: string;

  @IsOptional()
  @IsString()
  invoiceNumber?: string;

  @IsOptional()
  @IsDateString()
  issueDate?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsString()
  companyLogoUrl?: string;

  @IsOptional()
  @IsNumber()
  totalAmount?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EditInvoiceItemDto)
  lineItems?: EditInvoiceItemDto[];
}
