import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Ingredient } from "../shared/ingredient.model";
import { DataStorageService } from "../shared/data-storage.service";
import { ShoppingListService } from "./shopping-list.service";


@Injectable()
export class ShoppingListResolverService implements Resolve<Ingredient[]> {
    constructor(private dsService : DataStorageService, private slService : ShoppingListService) {}

    resolve(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) {
        const ingredients = this.slService.getIngredients();
        if (ingredients.length === 0)
            return this.dsService.fetchShoppingList();
        else
            return ingredients;
    }
}