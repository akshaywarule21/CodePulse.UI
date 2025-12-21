import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPostService } from '../services/blog-post.service';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/Models/category.model';
import { UpdateBlogPost } from '../models/update-blog-post';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit {
 id:string|null = null;
 paramSubscription?: Subscription;
 model?:BlogPost;
 categories$?:Observable<Category[]>;
 selectedCategories?:string[];
 isImageSelectorVisible:boolean=false;
  
constructor(private route: ActivatedRoute, private blogPostService: BlogPostService, private router: Router,private categoryService: CategoryService) 
  {

  }
  ngOnInit(): void {
    this.categories$=this.categoryService.getAllCategories();
    this.paramSubscription=this.route.paramMap.subscribe({
      next:(param)=>{
        this.id=param.get('id');
        if(this.id)
        {
          this.blogPostService.getBlogPostById(this.id).subscribe({
            next:(response)=>{
              this.model = response;
              this.selectedCategories=response.categories.map(cat=>cat.id);
            }
          })
        }
      }
    })
  }
  ngOnDestroy():void{
    this.paramSubscription?.unsubscribe();

  }
  onFormSubmit():void
  {
    if(this.model && this.id)
    {
      const updatedBlogPost:UpdateBlogPost={
        id:this.id,
        title:this.model.title,
        shortDescription:this.model.shortDescription,
        content:this.model.content,
        featuredImageUrl:this.model.featuredImageUrl,
        urlHandle:this.model.urlHandle,
        author:this.model.author,
        publishedDate:this.model.publishedDate,
        isVisible:this.model.isVisible,
        categories:this.selectedCategories || []
      };

      console.log('Updating blog post', updatedBlogPost);
      // Update the blog post and navigate back on success
      this.blogPostService.updateBlogPostById(this.id, updatedBlogPost).subscribe({
        next:(response)=>{
          this.router.navigateByUrl('/admin/blogposts');
        },
        error: (err) => {
          console.error('Failed to update blog post', err);
        }
      });

      return;
    }

    console.warn('No model or id available to update', this.model, this.id);
  }
  onDelete():void{
    if(this.id)
    {
      this.blogPostService.deleteBlogPostById(this.id).subscribe({
        next:(data)=>{
          this.router.navigateByUrl('/admin/blogposts');
        }
      })
    }

  }
  openImageSelector():void{
   this.isImageSelectorVisible=true;
  }
  onCancel():void{
    this.router.navigateByUrl('/admin/blogposts');
  }
    
}

