import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller("users")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("api/v1/signup")
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("api/v1/signin")
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
