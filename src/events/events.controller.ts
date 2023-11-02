import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpCode,
  Patch,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { Like, MoreThan, Repository } from 'typeorm';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendee } from './Attendee';
import { EventService } from './events.service';

@Controller('/events')
export class EventsController {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
    @InjectRepository(Attendee)
    private readonly attendRepository: Repository<Attendee>,
    private readonly eventService: EventService,
  ) {}

  @Get()
  async findAll() {
    return await this.repository.find();
  }

  @Get('/practice')
  async practice() {
    return await this.repository.find({
      select: ['id', 'when'],
      where: [
        {
          id: MoreThan(3),
          when: MoreThan(new Date('2021-02-12T13:00:00')),
        },
        {
          description: Like('%meet%'),
        },
      ],
      take: 2,
      order: {
        id: 'DESC',
      },
    });
  }

  @Get('practice2')
  async practice2() {
    // return await this.repository.find({
    //   where: {
    //     id: 1,
    //   },
    //   relations: {
    //     attendees: true,
    //   },
    // });
    const event = await this.repository.findOneBy({
      id: 1,
    });
    const attendee = new Attendee();
    attendee.name = 'new 1';
    attendee.event = event;
    await this.attendRepository.save(attendee);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const event = await this.eventService.getEvent(id);
    if (!event) {
      throw new NotFoundException();
    }
    return event;
  }

  @Post()
  async create(@Body() input: CreateEventDto) {
    return await this.repository.save({
      ...input,
      when: new Date(input.when),
    });
  }

  @Patch(':id')
  async update(@Param('id') id, @Body() input: UpdateEventDto) {
    const event = await this.repository.findOne(id);
    return await this.repository.save({
      ...event,
      ...input,
      when: input.when ? new Date(input.when) : event.when,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id) {
    const event = await this.repository.findOne(id);
    await this.repository.remove(event);
  }
}
