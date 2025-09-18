import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  //load all the categies
  public categories(){
    return this.httpClient.get(`${baseUrl}/category/`)
  }

  //add new category
  public addCategory(category:any){
    return this.httpClient.post(`${baseUrl}/category/`, category)
  }
}
