import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient)
  
  public createUser = (formData: RegisterForm) => {
    return this.http.post(`${baseUrl}/users`, formData)
  }
}
