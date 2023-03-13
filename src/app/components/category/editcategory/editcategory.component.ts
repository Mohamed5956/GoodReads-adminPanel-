import { Component, EventEmitter, Output, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Icategory } from 'src/app/models/icategory';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { CategoryComponent } from '../categoryList/category.component';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent {
  categoryForm: FormGroup
  name: boolean = false;
  selectedImage!: File;
  category: Icategory
  @Input() categoryId: string;
  @Output() categoryUpdated = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<CategoryComponent>,
    private categorySerivce: CategoryService,
    private router: Router,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { categoryId: string }

    // this.data.categoryId
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
    });
    this.categoryId = this.data.categoryId;
    this.category = {}
  }
  ngOnInit(): void {
    this.categorySerivce.getCategoryById(this.categoryId).subscribe((category) => {
      this.category = category;
      this.categoryForm.patchValue({
        name: category.name,
      })
    });
  }
  saveData() {
    console.log(this.categoryForm.get('name')?.value);
    console.log(this.categoryId);
    var form: any = new FormData;
    form.append('name', this.categoryForm.get('name')?.value);
    form.append('image', this.selectedImage, this.selectedImage.name);
    this.categorySerivce.updateCategory(this.categoryId, form).subscribe({
      next: (v) => {
        console.log(v);
        Swal.fire(
          'Updated Succesfully!',
          'You clicked the button!',
          'success'
        );
        this.categoryUpdated.emit(true);
        this.router.navigate(['/category']);
        this.closeDialog();
        window.location.reload();
      },
      error: (e) => {
        console.error(e);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please contact the backend Admin', // log the error message from the server
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



  get catname() {
    return this.categoryForm.get('name');
  }


}
