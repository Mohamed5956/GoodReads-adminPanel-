import { Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Iauthor } from 'src/app/models/iauthor';
import { AuthorService } from 'src/app/services/author.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AddauthorComponent } from '../addauthor/addauthor.component';
import { EditauthorComponent } from '../editauthor/editauthor.component';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
})
export class AuthorComponent implements OnInit, OnChanges {
  displayedColumns: string[] = [
    'id',
    'photo',
    'fname',
    'lname',
    'bdate',
    'description',
    'actions',
  ];
  image = `${environment.APIBaseURL}/assets/uploads/author`;
  authors: Iauthor[];
  constructor(
    private dialog: MatDialog,
    private authorService: AuthorService,
    private router: Router
  ) {
    this.authors = [];
  }
  ngOnInit() {
    this.authorService.getAllAuthors().subscribe((authList) => {
      this.authors = authList;
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddauthorComponent, {
      width: '500px',
    });
    dialogRef.componentInstance.AuthorAdded.subscribe(() => {
      this.authorService.getAllAuthors().subscribe((authList) => {
        this.authors = authList;
      });
    })
  }
  openEditDialog(id: string) {
    const dialogRef = this.dialog.open(EditauthorComponent, {
      width: '400px',
      data: { authorId: id }
    });
    dialogRef.componentInstance.AuthorUpdated.subscribe(() => {
      this.authorService.getAllAuthors().subscribe((authorList) => {
        this.authors = authorList
      });
    });
  }
  ngOnChanges() {
    this.openDialog();
  }
  deleteAuthor(id: string) {
    console.log(id);
    this.authorService.deleteAuthor(id).subscribe({
      next: (v) => {
        console.log(v);
        Swal.fire('Deleted Succesfully!', 'You clicked the button!', 'success');
        this.authors = this.authors.filter(author => author._id !== id);
      },
      error: (e) => {
        console.error(e);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      },
    });
  }
  updateAuthor(id: string) {

  }
}
