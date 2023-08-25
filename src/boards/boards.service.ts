import { Injectable } from '@nestjs/common';
import { Board } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';

let currentId: number = 1;

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto): Board {
    const board: Board = {
      id: `${currentId++}`,
      title: createBoardDto.title,
      description: createBoardDto.description,
      status: 'PUBLIC',
    };
    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id);
  }

  deleteBoard(id: string): void {
    this.boards = this.boards.filter((board) => board.id !== id);
  }
}
