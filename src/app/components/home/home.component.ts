import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Anime, APIResponse } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  order_by = "";
  sort = "";
  type = "";
  prevSearch:string | undefined;
  animes: Array<Anime> = new Array<Anime>;
  page:number = 1;
  hasNextPage:boolean = false;
  private routeSub: Subscription = new Subscription();
  animeSub: Subscription = new Subscription();

  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['anime-search']) {
        this.searchAnime(this.order_by, this.sort, this.type, params['anime-search']);
      } else {
        this.searchAnime(this.order_by, this.sort, this.type);
      }
    })
  }

  searchAnime(order_by: string,sort: string,type: string, search?: string): void {
    if (search)
      this.prevSearch = search;
    this.animeSub = this.httpService
    .getAnimeList(order_by, sort, type, this.prevSearch)
    .subscribe((animeList: APIResponse<Anime>) => {
      console.log(animeList);
      this.animes = animeList.data;
      this.hasNextPage = animeList.pagination.has_next_page;
    });
  }

  openAnimeDetails(anime_id: number): void {
    this.router.navigate(['details', anime_id]);
  }
  generateMoreAnime(order_by: string,sort: string,type: string, search?: string): void {
    if (this.hasNextPage)
    {
      if (search)
        this.prevSearch = search;
      this.page += 1;
      this.animeSub = this.httpService
      .getAnimeList(order_by, sort, this.prevSearch, this.type, this.page)
      .subscribe((animeList: APIResponse<Anime>) => {
        console.log(animeList);
        this.animes.push(...animeList.data);
        this.hasNextPage = animeList.pagination.has_next_page;
      });
    }
  }

  ngOnDestroy(): void {
    if (this.animeSub)
      this.animeSub.unsubscribe();
    if (this.routeSub)
      this.routeSub.unsubscribe();
  }
}
