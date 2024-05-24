import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode: boolean = false;
  supscription : Subscription;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.supscription = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  ngOnDestroy(): void {
      this.supscription.unsubscribe()
  }

  private initForm() {
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDescription = '';
    let recipePortions : number = 1;
    let recipeType = '';
    let recipeDifficulty = '';
    let recipeDuration : number = 20;
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDescription = recipe.description;
      recipePortions = recipe.portions;
      recipeType = recipe.type ? recipe.type : "Lunch";
      recipeDifficulty = recipe.difficulty ? recipe.difficulty : "Beginner";
      recipeDuration = recipe.duration ? recipe.duration : 20;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          let unit = "";
          if (ingredient.unit) {
            unit = ingredient.unit
          }
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount , [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
              unit: new FormControl(unit),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImgPath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      portions: new FormControl(recipePortions, [Validators.min(1), Validators.required]),
      type : new FormControl(recipeType, Validators.required),
      difficulty : new FormControl(recipeDifficulty, Validators.required),
      duration : new FormControl(recipeDuration, [Validators.required, Validators.min(5)]),
      ingredients: recipeIngredients,
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.setRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel()
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo : this.route})
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        unit: new FormControl(null),
      })
    );
  }

  onDeleteIngredient(index : number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
