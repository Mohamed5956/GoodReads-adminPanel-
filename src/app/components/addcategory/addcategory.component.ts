
  import { Component, Inject } from '@angular/core';

  import { MatDialogRef } from '@angular/material/dialog';

  import { Icategory } from 'src/app/models/icategory';
  import { CategoryService } from 'src/app/services/category.service';

  import { CategoryComponent } from '../category/category.component';

  @Component({
    selector: 'app-addcategory',
    templateUrl: './addcategory.component.html',
    styleUrls: ['./addcategory.component.css']
  })
  export class AddcategoryComponent {
    newCat: Icategory = {}
    constructor(
      public dialogRef: MatDialogRef<CategoryComponent>,
      private categorySerivce: CategoryService) {
    }
    saveData() {
      console.log("newCat", this.newCat)
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
