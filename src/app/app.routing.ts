import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', loadChildren: () => import( './recipes/recipes.module').then(x => x.RecipesModule) },
  { path: 'shopping-list', loadChildren: () => import( './shopping-list/shopping-list.module').then(x => x.ShoppingListModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
}) 
export class AppRouting {}
