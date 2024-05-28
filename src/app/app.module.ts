import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { AppRouting } from './app.routing';
import { DataStorageService } from './shared/data-storage.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { AuthService } from './auth/auth.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListResolverService } from './shopping-list/shopping-list-resolver.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRouting,
    HttpClientModule,
    AuthModule,
    SharedModule,    
    BrowserAnimationsModule
  ],
  providers: [
    AuthGuard,
    ShoppingListService,
    RecipeService,
    DataStorageService,
    RecipesResolverService,
    ShoppingListResolverService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
