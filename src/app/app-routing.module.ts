import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundError } from 'rxjs';
import { AuthorComponent } from './components/author/authorList/author.component';
import { BookListComponent } from './components/book/book-list/book-list.component';
import { CategoryComponent } from './components/category/categoryList/category.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      {
        path: 'category',
        component: CategoryComponent,
        canActivate: [AuthGuard],
      },
      { path: 'authors', component: AuthorComponent, canActivate: [AuthGuard] },
      { path: 'books', component: BookListComponent, canActivate: [AuthGuard] },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
