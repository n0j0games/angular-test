import { Injectable } from '@angular/core';
import { Recipe } from './recipe-list/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

  constructor(private shoppingListService : ShoppingListService) {}

  private recipes : Recipe[];
  /* private recipes: Recipe[] = [
    new Recipe(
      'Döner Kebap',
      'mmhhhh lecker frisch tropisch 8/10',
      'https://pbs.twimg.com/media/E8Y0l_mXIAALowz?format=jpg&name=large',
      [new Ingredient('Kalb',1), new Ingredient('Kräutersoße',1), new Ingredient('bisschen Schaharf', 2), new Ingredient('alles', 10)]
    ),
    new Recipe(
      'Burgies',
      'jahahahaha moiin leute',
      'https://i.ytimg.com/vi/FD-ToEVaS3U/maxresdefault.jpg',
      [new Ingredient('Buns',2), new Ingredient('Patties',2), new Ingredient('Käse mäse', 1), new Ingredient('Tomatde', 1)]
    ),
  ]; */

  recipesChanged = new Subject<Recipe[]>();

  getRecipes() {
    if (this.recipes)
      return this.recipes.slice(); // slice without params copies array
    else
      return [];
  }

  getRecipe(id : number) {
    return this.recipes[id];
  }

  shopIngredients(recipe : Recipe) {
    this.shoppingListService.addIngredients(recipe.ingredients);
  }

  addRecipe(recipe : Recipe) {
    this.recipes.push(recipe);
    this.recipes = this.recipes.sort(this.compare);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipe(index : number, recipe : Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes : Recipe[]) {
    this.recipes = recipes.sort(this.compare);
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index : number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  compare( a : Recipe ,b : Recipe ) {
    if ( a.name < b.name ) {
      return -1;
    }
    if ( a.name > b.name ) {
      return 1;
    }
    return 0;
  }

}
