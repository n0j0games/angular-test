import { Ingredient } from "../shared/ingredient.model";
import { Nutritions } from "./nutritions.model";

export class Recipe {
  constructor(
    public name: string,
    public description: string,
    public imagePath: string,
    public ingredients : Ingredient[],
    public portions : number,
    public type : string,
    public difficulty : string,
    public duration : number,
    public nutritions? : Nutritions
  ) {}
}
