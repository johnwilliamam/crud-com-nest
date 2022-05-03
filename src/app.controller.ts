import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller()
export class AppController {
@UseGuards(AuthGuard('local'))
@Post('auth/login')
async login(@Request() req){
  return req.user;
}
constructor(private readonly hello: AppService) {}
@Get('/')
initial(){
  return this.hello.getHello();
}

  /* @Get('/teste')  
async index() {
    const express = require('express');
    const app = express();
    app.use(express.json());
    const response = await axios.get('https://graph.microsoft.com/v1.0/me/mailfolders/inbox/messages?$select=subject,from,receivedDateTime&$top=25&$orderby=receivedDateTime%20DESC', {
      headers:{
        Accept: 'application/json',
        Authorization: 
      } 
    });
    console.log(response.data)
    return { dados: response.data };
  }*/

}
