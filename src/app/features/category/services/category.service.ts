import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../Models/add-category-request.model';
import { Observable } from 'rxjs';
import { Category } from '../Models/category.model';
import { environment } from 'src/environments/environment';
import { UpdateCategoryRequest } from '../Models/update-category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  addCategory(model:AddCategoryRequest):Observable<void>{
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Categories`,model);
  }
  getAllCategories():Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/Categories`);
  }
  getCategoryById(id: string):Observable<Category>{
    return this.http.get<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`);
  }
  editCategoryById(id:string,model:UpdateCategoryRequest):Observable<Category>{
    return this.http.put<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`,model);
  }
  deleteCategoryById(id:string):Observable<void>{
    return this.http.delete<void>(`${environment.apiBaseUrl}/api/Categories/${id}`);
  }
}
