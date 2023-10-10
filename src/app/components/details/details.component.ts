import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Anime, APIResponse } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  animeId: number = 1;
  anime!: Anime;
  allData: any;
  private routeSub!: Subscription;
  private animeSub!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.animeId = params['id'];
      this.getAnimeDetails(this.animeId);
    })
  }
  getAnimeDetails(id:number): void {
    this.animeSub = this.httpService
      .getAnimeDetails(id)
      .subscribe((animeRes: any) => {
        console.log(animeRes);
        this.allData = animeRes;
        this.anime = animeRes.data;
        console.log(this.anime);
      })
  }

  ngOnDestroy(): void {
    if (this.animeSub)
      this.animeSub.unsubscribe();
    if (this.routeSub)
      this.routeSub.unsubscribe();
  }
}
