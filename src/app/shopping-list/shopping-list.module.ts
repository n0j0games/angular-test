import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ShoppingListResolverService } from "./shopping-list-resolver.service";

const routes: Routes = [
    { path: '', component: ShoppingListComponent, resolve: [ShoppingListResolverService], },
  ];

@NgModule({
    declarations : [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports : [RouterModule.forChild(routes), SharedModule, FormsModule, ReactiveFormsModule]
})
export class ShoppingListModule {}