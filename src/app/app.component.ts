import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Review } from '../shared/models/review'; // imported class from review.ts
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const filters = [
  (item : Review) => item, // type 0 : show all
  (item : Review) => item.rating && item.rating >= 8 // type 1 : show only 8+
]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent { // components used in the html

  reviews : Review[] = [
    new Review('softscars', 'yeule', 2023, 'https://media1.jpc.de/image/w1155/front/0/5054429174267.jpg', 9, true),
    new Review('Utopia', 'Travis Scott', 2023, 'https://upload.wikimedia.org/wikipedia/en/2/23/Travis_Scott_-_Utopia.png', 5),
    new Review('Ocean Blvd', 'Lana Del Rey', 2023, 'https://m.media-amazon.com/images/I/61w8uwUglTL._UF1000,1000_QL80_.jpg'),
  ] // array of Review items
  
  listFilter : any = '0'; // holds input for the select filter

  ratings = new Array<number>(this.reviews.length); // holds inputs for each possible review-rating form

  get visibleItems() : Review[] {
    return this.reviews.filter(filters[this.listFilter]);
  }; // item copy. visible part of reviews selected by filter

  // sets rating 
  setRating(review : Review, i : number) {
    review.rating = this.ratings[i];
  }

  toggleListened(review : Review) {
    review.listened = !review.listened;
  }
}
