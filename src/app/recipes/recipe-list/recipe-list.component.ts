import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit, OnDestroy {

  constructor (private recipeService : RecipeService, private dsService : DataStorageService){}

  private sub : Subscription;

  recipes = [];

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.sub = this.recipeService.recipesChanged.subscribe(
      (recipes : Recipe[]) => {
        this.recipes = recipes;
        this.dsService.storeRecipes();
      }
    );    
  }

  ngOnDestroy(): void {
      if (this.sub)
        this.sub.unsubscribe();
  }  

}
