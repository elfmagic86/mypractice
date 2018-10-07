import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { HeroSearchService } from './hero-search.service';
import { Hero } from './hero';

@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
  private searchTerms = new Subject<string>();
  heroes: Observable<Hero[]>;
  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.heroes = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => { // switch to new observable each time the term changes
        let result;
        if (term) {
          // return the http search observable
          result = this.heroSearchService.search(term)
        } else {
          // or the observable of empty heroes if there was no search term
          result = Observable.of<Hero[]>([]);
        }
        return result;
      })
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Hero[]>([]);
      });
  }
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  gotoDetail(hero: Hero): void {
    let link = ['/hero', hero.id];
    this.router.navigate(link);
  }
}
