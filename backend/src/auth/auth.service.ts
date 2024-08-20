import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signup(dto: AuthDto): Promise<{ access_token: string }> {
    // Generate the password hash
    const hash = await argon.hash(dto.password);

    // Save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      this.logger.log(`User ${user.email} signed up successfully`);

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // Check if the error code indicates a unique constraint violation
        if (error.code === 'P2002') {
          this.logger.error(
            `Signup failed for ${dto.email}: Credentials taken`,
          );
          throw new ForbiddenException('Credentials taken');
        }
      }
      this.logger.error(`Signup failed for ${dto.email}: ${error.message}`);
      throw error;
    }
  }

  async signin(dto: AuthDto): Promise<{ access_token: string }> {
    // Find the user by email
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // If user does not exist, throw exception
    if (!user) {
      this.logger.warn(`Signin failed for ${dto.email}: Credentials incorrect`);
      throw new ForbiddenException('Credentials incorrect');
    }

    // Compare password
    const pwMatches = await argon.verify(user.hash, dto.password);

    // If password is incorrect, throw exception
    if (!pwMatches) {
      this.logger.warn(`Signin failed for ${dto.email}: Credentials incorrect`);
      throw new ForbiddenException('Credentials incorrect');
    }

    this.logger.log(`User ${dto.email} signed in successfully`);

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: userId, email };
    const secret = this.config.get<string>('JWT_SECRET');

    // Generate JWT token
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '24h',
      secret: secret,
    });

    return { access_token: token };
  }
}
