import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Review } from '../shared/models/review';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  reviews = [
    new Review('softscars', 'yeule', 2023, 9, 'https://media1.jpc.de/image/w1155/front/0/5054429174267.jpg'),
    new Review('Utopia', 'Travis Scott',2023, 8, 'https://upload.wikimedia.org/wikipedia/en/2/23/Travis_Scott_-_Utopia.png'),
    new Review('Ocean Blvd', 'Lana Del Rey', 2023, 8, 'https://m.media-amazon.com/images/I/61w8uwUglTL._UF1000,1000_QL80_.jpg')
  ]
  title = 'pooop';
}
