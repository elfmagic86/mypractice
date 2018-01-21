import { Component, OnInit } from '@angular/core';
import { Router }   from '@angular/router';

// TODO type정의를 위해 import 하는 행동이 반복되는것에 대한해결책은?
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'heroes',
  templateUrl: './heroes.component.html',
  styleUrls: [ './heroes.component.css' ]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private router: Router,
    private heroService: HeroService
  ) {}
  // 초기화를 ngOnInit에 하는것은, 인스턴스초기화 시점과(DI로 관리될수도있으니), 그려진 후의 초기화를 분리하기위함인듯함
  ngOnInit() {
    this.getHeroes();
  }
  // fetch해서 데이터 바인딩하는 것이나. 다름없음. refresh도가능하고.
  getHeroes() {
    this.heroService.getHeroes().then((heroes) => this.heroes = heroes);
  }
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  gotoDetail(): void {
    this.router.navigate(['/hero', this.selectedHero.id]);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) return;

    this.heroService
      .create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }
  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter((h) => h !== hero);
        if (this.selectedHero === hero) {
          this.selectedHero = null;
        }
      });
  }
}
