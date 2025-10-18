import { Component } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-posts.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-blogposts',
  templateUrl: './add-blogposts.component.html',
  styleUrls: ['./add-blogposts.component.css']
})
export class AddBlogpostsComponent {
  model: AddBlogPost;
  constructor(private blogPostService: BlogPostService, private router: Router) {
    
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      author: '',
      publishedDate: new Date(),
      isVisible: false
    }
  }
  onFormSubmit():void{
    this.blogPostService.createBlogPost(this.model).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blogposts');
      }
    });
    //console.log(this.model);
  }
}
