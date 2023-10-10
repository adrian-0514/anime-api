import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Anime, APIResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getAnimeList(order_by?: string,sort?: string, type?: string, search?: string,page: number = 1) : Observable<APIResponse<Anime>>
  {
    let params = new HttpParams();
    if (order_by)
      params = params.append('order_by', order_by);
    if (sort)
      params = params.append('sort', sort);
    if (type)
      params = params.append('type', type);
    if (search)
      params = params.append('letter', search);
    
      console.log(order_by);
      console.log(sort);
      console.log(search);
    params = params.append('page', page);
    console.log(params);
    
    return this.http.get<APIResponse<Anime>>(`${env.BASE_URL}/anime`, {params: params});
  }
  
  getAnimeDetails(id: number): Observable<Anime> {
    console.log(id);
    const detailReq = this.http.get<Anime>(`${env.BASE_URL}/anime/${id}`);
    const picturesReq = this.http.get<Anime>(`${env.BASE_URL}/anime/${id}/pictures`);
    const videosReq = this.http.get<Anime>(`${env.BASE_URL}/anime/${id}/videos`);

    return forkJoin(
      {
        detailReq,
        picturesReq,
        videosReq
      }).pipe(
        map((resp: any) => {
          return {
            ...resp['detailReq'],
            pictures: resp['picturesReq']?.data,
            videos: resp['videosReq']?.data
          };
        })
      );
  }
}
