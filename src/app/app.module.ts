import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// matrial module imports
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';

// components
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AddcategoryComponent } from './components/category/addcategory/addcategory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorComponent } from './components/author/authorList/author.component';
import { AddauthorComponent } from './components/author/addauthor/addauthor.component';
import { CategoryComponent } from './components/category/categoryList/category.component';
import { AddbookComponent } from './components/book/addbook/addbook.component';
import { BookListComponent } from './components/book/book-list/book-list.component';
import { MatTableModule } from '@angular/material/table';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';




import { MatDatepickerModule } from '@angular/material/datepicker';
import { EditcategoryComponent } from './components/category/editcategory/editcategory.component';
import { EditauthorComponent } from './components/author/editauthor/editauthor.component';
import { EditbookComponent } from './components/book/editbook/editbook.component';

import { DatePipe } from '@angular/common';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    AddcategoryComponent,
    CategoryComponent,
    AuthorComponent,
    AddauthorComponent,
    AddbookComponent,
    BookListComponent,
    LoginComponent,
    MainComponent,
    NotFoundComponent,
    EditcategoryComponent,
    EditauthorComponent,
    EditbookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // matrial modules
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatTableModule,
    MatSelectModule,
    // forms module
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
