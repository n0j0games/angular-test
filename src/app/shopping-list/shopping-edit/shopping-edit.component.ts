import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
  INJECTOR,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  shoppingForm: FormGroup;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  ngOnInit(): void {
    this.shoppingForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(1, [Validators.required, Validators.min(1)]),
      unit: new FormControl(null)
    });

    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
          unit: this.editedItem.unit,
        });
      }
    );
  }

  onAddItem() {
    if (!this.shoppingForm.valid) return;

    const name = this.shoppingForm.value.name;
    const amount = this.shoppingForm.value.amount;
    const unit = this.shoppingForm.value.unit;

    let ingredient : Ingredient;
    if (unit) {
      ingredient = new Ingredient(name, amount, unit)
    } else {
      ingredient = new Ingredient(name, amount, null)
    }

    if (this.editMode) {
      this.shoppingListService.setIngredient(this.editedItemIndex, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
    
    this.onClear();
  }

  onClear() {
    this.shoppingForm.reset();
    this.editMode = false;
    this.editedItemIndex = null;
  }

  onDeleteItem() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
