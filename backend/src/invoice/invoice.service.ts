/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInvoiceDto, EditInvoiceDto } from './dto';

@Injectable()
export class InvoiceService {
  constructor(private readonly prisma: PrismaService) {}

  getInvoices(userId: number) {
    return this.prisma.invoice.findMany({
      where: {
        userId,
      },
      include: {
        lineItems: true, // Include line items if needed
      },
    });
  }

  getInvoiceById(userId: number, invoiceId: number) {
    return this.prisma.invoice.findFirst({
      where: {
        id: invoiceId,
        userId,
      },
      include: {
        lineItems: true, // Include line items if needed
      },
    });
  }

  async createInvoice(userId: number, dto: CreateInvoiceDto) {
    const { lineItems, invoiceNumber, ...invoiceData } = dto;
  
    // Check if invoice with the same number already exists
    const existingInvoice = await this.prisma.invoice.findUnique({
      where: { invoiceNumber },
    });
  
    if (existingInvoice) {
      throw new Error(`Invoice with number ${invoiceNumber} already exists.`);
    }
  
    // Create the new invoice
    const invoice = await this.prisma.invoice.create({
      data: {
        ...invoiceData,
        invoiceNumber,
        userId,
        lineItems: {
          create: lineItems.map(item => ({
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            taxAmount: item.taxAmount,
            totalAmount: item.totalAmount,
          })),
        },
      },
    });
    return invoice;
  }
  
  async editInvoiceById(userId: number, invoiceId: number, dto: EditInvoiceDto) {
      const invoice = await this.prisma.invoice.findUnique({
        where: {
          id: invoiceId,
        },
        include: {
          user: true,
        },
      });
    
      if (!invoice || invoice.userId !== userId) {
        throw new ForbiddenException('Access to resources denied');
      }
    
      const upsertLineItems = dto.lineItems.map((item) => ({
        where: {
          id: item.id ? item.id : -1, // Provide a valid id if available, otherwise use -1 (which will not match any existing id)
        },
        update: {
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          taxAmount: item.taxAmount,
          totalAmount: item.totalAmount,
        },
        create: {
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          taxAmount: item.taxAmount,
          totalAmount: item.totalAmount,
        },
      }));
    
      return this.prisma.invoice.update({
        where: {
          id: invoiceId,
        },
        data: {
          issuerCompanyName: dto.issuerCompanyName,
          issuerContactName: dto.issuerContactName,
          issuerAddress: dto.issuerAddress,
          issuerCity: dto.issuerCity,
          issuerCountry: dto.issuerCountry,
          clientCompanyName: dto.clientCompanyName,
          clientAddress: dto.clientAddress,
          clientCity: dto.clientCity,
          clientCountry: dto.clientCountry,
          invoiceNumber: dto.invoiceNumber,
          issueDate: dto.issueDate,
          dueDate: dto.dueDate,
          companyLogoUrl: dto.companyLogoUrl,
          lineItems: {
            upsert: upsertLineItems,
          },
        },
        include: {
          lineItems: true,
        },
      });
    }
    

  async deleteInvoiceById(userId: number, invoiceId: number) {
    const invoice = await this.prisma.invoice.findUnique({
      where: {
        id: invoiceId,
      },
    });

    if (!invoice || invoice.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }

    await this.prisma.invoice.delete({
      where: {
        id: invoiceId,
      },
    });
  }
}


