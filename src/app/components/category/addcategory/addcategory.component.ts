
import { Component } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2'

import { Icategory } from 'src/app/models/icategory';
import { CategoryService } from 'src/app/services/category.service';

import { CategoryComponent } from '../category.component';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent {
  newCat: Icategory = {}
  categoryForm: FormGroup
  name: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<CategoryComponent>,
    private categorySerivce: CategoryService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    })
  }
  saveData() {
    this.newCat = {
      name: this.categoryForm.value.name
    };
    console.log(this.newCat);
    this.categorySerivce.addCategory(this.newCat).subscribe({
      next: (v) => {
        console.log(v);
        Swal.fire(
          'Added Succesfully!',
          'You clicked the button!',
          'success'
        );
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

  closeDialog() {
    this.dialogRef.close();
  }
}
