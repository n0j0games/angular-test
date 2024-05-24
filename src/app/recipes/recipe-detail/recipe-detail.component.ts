import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from '../../shared/ingredient.model';
import { DataStorageService } from '../../shared/data-storage.service';

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

      switch (this.visibleRecipe.type) {
        case 'Breakfast':
          this.typeClass = 'fa-solid fa-mug-saucer';
          break;
        case 'Soup':
          this.typeClass = 'fa-solid fa-bowl-food';
          break;
        case 'Starter':
          this.typeClass = 'fa-solid fa-bowl-rice';
          break;
        case 'Lunch':
          this.typeClass = 'fa-solid fa-burger';
          break;
        case 'Dinner':
          this.typeClass = 'fa-solid fa-utensils';
          break;
        case 'Snack':
          this.typeClass = 'fa-solid fa-apple-whole';
          break;
        case 'Dessert':
          this.typeClass = 'fa-solid fa-ice-cream';
          break;
        default:
          this.typeClass = 'fa-solid fa-utensils';
          break;
      }
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
          (ingredient.amount * this.multiplier) / this.originalPortions,
          ingredient.unit
        )
      );
    }
    this.recipeService.shopIngredients(ingredientCopy);
    this.dsService.storeShoppingList();
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
