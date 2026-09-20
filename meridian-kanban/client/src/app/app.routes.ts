import { Routes } from '@angular/router';
import { JoinPage } from './join/join.page';
import { BoardPage } from './board/board.page';

export const routes: Routes = [
  { path: '', component: JoinPage },
  { path: 'board/:id', component: BoardPage },
];
