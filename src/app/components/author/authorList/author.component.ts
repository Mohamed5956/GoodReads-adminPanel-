import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthorService } from 'src/app/services/author.service';
import { AddauthorComponent } from '../addauthor/addauthor.component';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
})
export class AuthorComponent {
  constructor(private dialog: MatDialog, private authorService: AuthorService) {
    let authors: Array<string>;
  }
  ngOnInit() {
    // authors: ;
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddauthorComponent, {
      width: '500px',
    });
  }
}
