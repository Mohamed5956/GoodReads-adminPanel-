
import { Component } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import { Icategory } from 'src/app/models/icategory';
import { CategoryService } from 'src/app/services/category.service';

import { CategoryComponent } from '../category/category.component';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';


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
    this.categorySerivce.addCategory(this.newCat).subscribe(response => {
      console.log('Data saved successfully!', response);
      this.dialogRef.close();
    }, error => {
      console.log('Error saving data:', error);
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
