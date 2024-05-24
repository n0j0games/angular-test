import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
    { path: 'auth', component: AuthComponent}
  ];

@NgModule({
    declarations : [
        AuthComponent
    ],
    imports : [RouterModule.forChild(routes), SharedModule, ReactiveFormsModule]
})
export class AuthModule {}