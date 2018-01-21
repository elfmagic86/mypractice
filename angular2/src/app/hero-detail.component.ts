import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input()
  hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => {
        // this.router.navigate(['/hero', this.selectedHero.id]);
        // [routerLink]="['/hero', hero.id]"
        // 키가 id라는 것은 어떻게 알았지.
        console.debug('routeParams:', params);
        return this.heroService.getHero(params['id'])
      })
      .subscribe(hero => this.hero = hero);
  }
  goBack(): void {
    this.location.back();
  }
  update(): void {
    this.heroService
      .update(this.hero)
      .then(() => this.goBack());
  }
}
