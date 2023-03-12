import { Component, EventEmitter, Output } from '@angular/core';
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
  styleUrls: ['./addauthor.component.css'],
})
export class AddauthorComponent {
  authorForm: FormGroup;
  selectedImage!: File;
  @Output() AuthorAdded = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<AuthorComponent>,
    private authorSerivce: AuthorService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.authorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      photo: ['', Validators.required],
      birthDate: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  saveData() {
    var form: any = new FormData();
    form.append('photo', this.selectedImage, this.selectedImage.name);
    form.append('birthDate', this.authorForm.get('birthDate')?.value);
    form.append('firstName', this.authorForm.get('firstName')?.value);
    form.append('lastName', this.authorForm.get('lastName')?.value);
    form.append('description', this.authorForm.get('description')?.value);
    this.authorSerivce.addAuthor(form).subscribe({
      next: (v) => {
        console.log(v);
        Swal.fire('Added Succesfully!', 'You clicked the button!', 'success');
        this.AuthorAdded.emit(true);
        this.router.navigate(['/authors']);
        this.closeDialog();
        window.location.reload();
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

  onSelectedFile(event: any) {
    this.selectedImage = <File>event.target.files[0];
    console.log(this.selectedImage);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
