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
  selectedImage!: File;
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
    var formData: any = new FormData;
    formData.append('photo', this.selectedImage, this.selectedImage.name);
    this.newAuthor = {
      firstName: this.authorForm.value.firstName,
      lastName: this.authorForm.value.lastName,
      photo: this.selectedImage.name,
      birthDate: this.authorForm.value.birthDate
    };
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

  onSelectedFile(event: any) {
    this.selectedImage = <File>event.target.files[0];
    console.log(this.selectedImage);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
