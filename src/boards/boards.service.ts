import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

let currentId: number = 1;

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(title: string, description: string) {
    const board: Board = {
      id: `${currentId++}`,
      title: title,
      description: description,
      status: 'PUBLIC',
    };
    this.boards.push(board);
    return board;
  }
}
