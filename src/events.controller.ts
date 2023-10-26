import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';

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

  @Patch()
  update(@Param('id') id, @Body() input: UpdateEventDto) {
    input.address;
    return id;
  }

  @Delete()
  @HttpCode(204)
  delete() {}
}
