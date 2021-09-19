import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Diameter, Person } from '../interfaces';


@Injectable({
	providedIn: 'root'
})
export class ApiCallsService {

	baseUrl: string = 'https://swapi.dev/api/people';

	constructor( private http: HttpClient ) { }

	getPersons(person: string): Observable<Person> {
		return this.http.get<Person>(this.baseUrl, {
			params: new HttpParams().set('search', person)
		})
	}

	getDiameter(planet: string): Observable<Diameter> {
		return this.http.get<Diameter>(planet);
	}
}
