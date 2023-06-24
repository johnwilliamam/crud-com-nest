/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller()
export class AppController {
constructor(private readonly hello: AppService) {}
@UseGuards(AuthGuard('local'))
@Post('auth/login')
async login(@Request() req){
  return req.user;
}
@Post('/teste')
async teste(@Request() req) {
  console.log(req.data);
  return JSON.stringify(req.data);
}

@Get('/json')
async js(@Request() req) {}

@Get('/')
initial(){
  return this.hello.getHello();
}}
