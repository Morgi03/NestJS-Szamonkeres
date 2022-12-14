import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CatDto } from './Cat.dto';
import db from './db';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async listcats(
    @Query('search')
    szem_szin = '',
  ) {
    const [rows] = await db.execute(
      'SELECT id, suly, szem_szin FROM macskak WHERE szem_szin LIKE ? ORDER BY suly DESC',
      ['%' + szem_szin + '%'],
    );
    return {
      cats: rows,
      link: 'cats/new',
    };
  }

  @Get('cats/new')
  @Render('form')
  newCatForm() {
    return { link: '/' };
  }

  @Post('cats/new')
  @Redirect()
  async newCat(@Body() cat: CatDto) {
    const [result]: any = await db.execute(
      'INSERT INTO macskak (suly, szem_szin) VALUES (?, ?)',
      [cat.suly, cat.szem_szin],
    );
    return {
      url: '/',
    };
  }
}
