import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  _url = '../../assets/MOCK_DATA.json';

  constructor(private http: HttpClient) { }

  getData(): Observable<Student[]>{
    return this.http.get<Student[]>(this._url);
  }
}
