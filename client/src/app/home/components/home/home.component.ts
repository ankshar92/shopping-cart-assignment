import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Banner } from '../../models/banner';
import { Category } from '../../models/category';
import { HomeService } from '../../services/home.service';
import { SEOService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  banners: Banner[] = [];
  categories: Category[] = [];
  contentLoadedOnce: boolean = false;

  constructor(
    private homeService: HomeService,
    private seoService: SEOService
  ) {}

  ngOnInit(): void {
    this.seoService.setTitle('Home');
    this.seoService.setDescription(
      'Find the best deals on Sabka Bazaar and shop using different categories.'
    );

    forkJoin(this.getBanners(), this.getCategories()).subscribe(
      () => (this.contentLoadedOnce = true)
    );
  }

  isOdd(index: number) {
    return index % 2 !== 0;
  }

  getBanners() {
    return this.homeService
      .getBanners()
      .pipe(tap((banners: Banner[]) => (this.banners = banners)));
  }

  getCategories() {
    return this.homeService
      .getCategories()
      .pipe(tap((categories: Category[]) => (this.categories = categories)));
  }
}
