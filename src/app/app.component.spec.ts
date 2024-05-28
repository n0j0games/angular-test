import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { RecipeService } from './recipes/recipe.service';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { DataStorageService } from './shared/data-storage.service';
import { ShoppingListResolverService } from './shopping-list/shopping-list-resolver.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { HeaderComponent } from './header/header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppRouting } from './app.routing';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { inject } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent
      ],
      imports : [
        HttpClientTestingModule,
        AppRouting,
        AuthModule,
        SharedModule,    
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
    });
    TestBed.compileComponents();
  });

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
