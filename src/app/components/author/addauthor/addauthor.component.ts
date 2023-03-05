import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Iauthor } from 'src/app/models/iauthor';
import { AuthorService } from 'src/app/services/author.service';
import Swal from 'sweetalert2';
import { AuthorComponent } from '../authorList/author.component';

@Component({
  selector: 'app-addauthor',
  templateUrl: './addauthor.component.html',
  styleUrls: ['./addauthor.component.css']
})
export class AddauthorComponent {
  newAuthor: Iauthor = {}
  authorForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AuthorComponent>,
    private categorySerivce: AuthorService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.authorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      photo: ['', Validators.required],
      birthDate: ['', Validators.required]
    })
  }

  saveData() {
    this.newAuthor = {
      firstName: this.authorForm.value.firstName,
      lastName: this.authorForm.value.lastName,
      photo: this.authorForm.value.photo,
      birthDate: this.authorForm.value.birthDate
    };
    console.log(this.authorForm);
    this.categorySerivce.addAuthor(this.newAuthor).subscribe({
      next: (v) => {
        console.log(v);
        Swal.fire(
          'Added Succesfully!',
          'You clicked the button!',
          'success'
        );
        this.router.navigate(['/authors']);
        this.closeDialog()
      },
      error: (e) => {
        console.error(e)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      },
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
