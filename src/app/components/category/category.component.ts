import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { AddcategoryComponent } from '../addcategory/addcategory.component';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  constructor(private dialog: MatDialog, private categoryService: CategoryService) {

  }
  openDialog() {
    const dialogRef = this.dialog.open(AddcategoryComponent, {
      width: '400px',
      data: { name: '' }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.categoryService.addCategory(result).subscribe(() => {
    //       // handle successful book addition
    //       console.log(result);
    //     }, (err) => {
    //       // handle failed book addition
    //       console.log(err)
    //     });
    //   }
    // });
  }
}
