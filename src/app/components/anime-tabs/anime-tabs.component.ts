import { Component, OnInit, Input } from '@angular/core';
import { Anime } from 'src/app/models';

@Component({
  selector: 'app-anime-tabs',
  templateUrl: './anime-tabs.component.html',
  styleUrls: ['./anime-tabs.component.css']
})
export class AnimeTabsComponent implements OnInit {

  @Input()
  anime!: Anime;

  @Input()
  allData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
