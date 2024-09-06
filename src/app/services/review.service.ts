import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

const AUTH_API = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor() { }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),  
    name: new FormControl(null),
    cover: new FormControl(null),
    rating: new FormControl(null),
  })
}
