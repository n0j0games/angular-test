import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private igChangeSub : Subscription;

  constructor(private shoppingListService: ShoppingListService, private dsService : DataStorageService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        console.log("Ingredients changed!");
        this.ingredients = ingredients;
        this.dsService.storeShoppingList();
      }
    );
  }

  ngOnDestroy(): void {
      if (this.igChangeSub)
        this.igChangeSub.unsubscribe();
  }

  onEditItem(index : number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
