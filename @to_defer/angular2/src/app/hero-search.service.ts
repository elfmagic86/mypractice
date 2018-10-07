import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { Hero } from './hero';

@Injectable()
export class HeroSearchService {
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) {}

  search(term: string): Observable<Hero[]> {
    return this.http
              .get(`app/heroes/?name=${term}`)
              .map(res => res.json().data as Hero[])
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
