import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Hero } from './hero';

@Injectable()
export class HeroService {
  private heroesUrl: string = 'api/heroes';
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) {}

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
              .toPromise()
              .then(res => res.json().data as Hero[])
              .catch(this.handleError);
  }
  getHero(id: string): Promise<Hero> {
    const numId: number = +id;
    return this.http.get(`${this.heroesUrl}/${numId}`)
              .toPromise()
              .then(res => res.json().data as Hero)
              .catch(this.handleError);
  }
  update(hero: Hero): Promise<Hero> {
    const url: string = `${this.heroesUrl}/${hero.id}`;
    return this.http
              .put(url, JSON.stringify(hero), {headers: this.headers})
              .toPromise()
              .then(() => hero)
              .catch(this.handleError);
  }
  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
  delete(id: number): Promise<void> { // Promise<void> 에 대응되는게 null이군
    const url: string = `${this.heroesUrl}/${id}`;
    return this.http
      .delete(url, {headers: this.headers})
      .toPromise()
      .then(res => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
