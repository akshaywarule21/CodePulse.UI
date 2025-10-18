import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../Models/category.model';
import { UpdateCategoryRequest } from '../Models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit , OnDestroy{
  /**
   *
   */
  id:string|null = null;
  paramSubscription?: Subscription;
  category?:Category
  categorySubscription?:Subscription;
  constructor(private route:ActivatedRoute, private categoryService:CategoryService, private router: Router) {
   
    
  }
  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.categorySubscription?.unsubscribe();
  }
  ngOnInit(): void {
   this.paramSubscription= this.route.paramMap.subscribe({
      next : (params) =>{
         this.id = params.get('id');
         if(this.id)
          {
             this.categoryService.getCategoryById(this.id).subscribe({
              next:(response)=>{
                this.category = response;
              }
             })
          }
      }})
  }

  onFormSubmit():void{
    console.log(this.category);
    const updateCategoryRequest:UpdateCategoryRequest = {
      urlHandle: this.category?.urlHandle!,
      name: this.category?.name!
    }
   this.categorySubscription = this.categoryService.editCategoryById(this.id!,updateCategoryRequest).subscribe({
      next:(response: Category)=>{
        this.router.navigateByUrl('admin/categories');
      }
    })
  }

  onDeleteCategory():void{
  if(this.id){
    this.categoryService.deleteCategoryById(this.id).subscribe({
      next:(response)=>{
        this.router.navigateByUrl('admin/categories');
      }
    })
  }
  }


}
