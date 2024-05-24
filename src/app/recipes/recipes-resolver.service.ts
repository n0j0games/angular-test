import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";

@Injectable()
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(private dsService : DataStorageService, private rService : RecipeService) {}

    resolve(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) {
        const recipes = this.rService.getRecipes();
        if (recipes.length === 0)
            return this.dsService.fetchRecipes();
        else
            return recipes;
    }
}