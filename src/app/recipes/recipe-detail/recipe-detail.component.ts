import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from '../../shared/ingredient.model';
import { DataStorageService } from '../../shared/data-storage.service';
import { FoodType, getFoodIcon } from '../../shared/food-type.enum';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  visibleRecipe: Recipe = null;
  id: number;
  originalPortions: number;
  multiplier: number;

  typeClass: string;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private dsService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.visibleRecipe = this.recipeService.getRecipe(this.id);
      this.originalPortions = this.visibleRecipe.portions;
      this.multiplier = this.originalPortions;
      this.typeClass = getFoodIcon(this.visibleRecipe.type as FoodType);
    });
  }

  onPortionSubmit() {
    console.log(this.multiplier);
  }

  shopIngredients() {
    const ingredientCopy: Ingredient[] = [];
    for (let ingredient of this.visibleRecipe.ingredients) {
      ingredientCopy.push(
        new Ingredient(
          ingredient.name,
          this.getMultiplierValue(ingredient.amount),
          ingredient.unit
        )
      );
    }
    this.recipeService.shopIngredients(ingredientCopy);
    this.dsService.storeShoppingList();
  }

  getMultiplierValue(amount : number) {
    return amount * this.multiplier / this.originalPortions;
  }
}
