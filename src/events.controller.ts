import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpCode,
} from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';

@Controller('/events')
export class EventsController {
  @Get()
  findAll() {
    return [
      { id: 1, name: 'First Event' },
      { id: 2, name: 'Second Event' },
    ];
  }

  @Get(':id')
  findOne(@Param() id) {
    return { id: 2, name: 'Second Event' };
  }

  @Post()
  create(@Body() input: CreateEventDto) {
    return input;
  }

  @Delete()
  @HttpCode(204)
  delete() {}
}
