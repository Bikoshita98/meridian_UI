import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MrToastContainer } from '@meridian/ui/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MrToastContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
