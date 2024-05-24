import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';

@Injectable()
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService,
    private slService: ShoppingListService
  ) {}

  storeShoppingList() {
    const shoppinglist = this.slService.getIngredients();
    console.log(shoppinglist)
    this.http
      .put(
        'https://angulartest-1d86e-default-rtdb.europe-west1.firebasedatabase.app/shoppinglist.json',
        shoppinglist
      )
      .subscribe();
  }

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http
      .put(
        'https://angulartest-1d86e-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe();
  }

  fetchShoppingList() {
    return this.http.get<Ingredient[]>(
      'https://angulartest-1d86e-default-rtdb.europe-west1.firebasedatabase.app/shoppinglist.json',
    ).pipe(
      tap((ingredients) => {
        if (ingredients != null)
          this.slService.setIngredients(ingredients);
      })
    );
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(
        'https://angulartest-1d86e-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
    ).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        if (recipes != null)
          this.recipesService.setRecipes(recipes);
      })
    );
  }
}
