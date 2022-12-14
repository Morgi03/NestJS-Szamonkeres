import { Body, Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { CatDto } from './Cat.dto';
import db from './db';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async listcats(
    @Query('szem_szin')
    szem_szin = 'zöld',
  ) {
    const [rows] = await db.execute(
      'SELECT id, suly, szem_szin FROM macskak WHERE szem_szin LIKE(?) ORDER BY suly DESC',
      [szem_szin],
    );
    return {
      cats: rows,
    };
  }

  @Get('cats/new')
  @Render('form')
  newPaintingForm() {
    return {};
  }
}
