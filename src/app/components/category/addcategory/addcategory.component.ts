
import { Component } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2'

import { Icategory } from 'src/app/models/icategory';
import { CategoryService } from 'src/app/services/category.service';


import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryComponent } from '../categoryList/category.component';

import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent {
  categoryForm: FormGroup
  name: boolean = false;
  selectedImage!: File;
  @Output() categoryAdded = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<CategoryComponent>,
    private categorySerivce: CategoryService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      image: ['']
    })
  }
  saveData() {
    var formData: any = new FormData;
    formData.append('name', this.categoryForm.get('name')?.value);
    formData.append('image', this.selectedImage, this.selectedImage.name);
    this.categorySerivce.addCategory(formData).subscribe({
      next: (v) => {
        console.log(v);
        Swal.fire(
          'Added Succesfully!',
          'You clicked the button!',
          'success'
        );
        this.categoryAdded.emit(true);
        this.router.navigate(['/category']);
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
