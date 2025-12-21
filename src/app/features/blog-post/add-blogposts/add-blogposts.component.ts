import { Component, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-posts.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../../category/Models/category.model';


@Component({
  selector: 'app-add-blogposts',
  templateUrl: './add-blogposts.component.html',
  styleUrls: ['./add-blogposts.component.css']
})
export class AddBlogpostsComponent implements OnInit {
  model: AddBlogPost;
  categories$?: Observable<Category[]>;
  constructor(private blogPostService: BlogPostService, private router: Router, private categoryService: CategoryService) {
    
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      author: '',
      publishedDate: new Date(),
      isVisible: false,
      categories: []
    }
  }
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }
  onFormSubmit():void{
    console.log(this.model);
    this.blogPostService.createBlogPost(this.model).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blogposts');
      }
    });
    //console.log(this.model);
  }
}
