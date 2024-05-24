import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {

    private ingredients : Ingredient[] = [];
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index : number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient : Ingredient) {
        this.insertIngredient(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    clearIngredients() {
        this.ingredients = [];
        this.ingredientsChanged.next([]);
    }

    private insertIngredient(ingredient : Ingredient) {
        for (let ing of this.ingredients) {
            if (ing.name == ingredient.name && ing.unit == ingredient.unit) {
                ing.amount += ingredient.amount;
                return;
            }
        }
        this.ingredients.push(ingredient);
    }

    setIngredient(index : number, ingredient : Ingredient) {
        this.ingredients[index] = ingredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    setIngredients(ingredients : Ingredient[]) {
        this.ingredients = [...ingredients];
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients : Ingredient[]) {
        for (let ingredient of ingredients) {
            this.insertIngredient(ingredient);
        }
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index : number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

}