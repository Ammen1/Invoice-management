import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get<string>("DATABASE_URL"),
        },
      },
    });
  }

  async cleanDb() {
    // Use a transaction to ensure all deletions happen atomically
    await this.$transaction([this.user.deleteMany()]);
  }
}
