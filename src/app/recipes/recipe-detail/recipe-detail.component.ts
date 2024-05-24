import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe-list/recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {

  visibleRecipe : Recipe = null;
  id : number;

  constructor(private recipeService : RecipeService, private route: ActivatedRoute, private router : Router) {}

  ngOnInit(): void {
      this.route.params.subscribe(
        (params : Params) => { 
          this.id = +params['id'];
          this.visibleRecipe = this.recipeService.getRecipe(this.id);
        }
      )

  }

  shopIngredients() {
    this.recipeService.shopIngredients(this.visibleRecipe);
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo : this.route})
  }

}
