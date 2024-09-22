import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _hostRickAndMorty } from 'src/app/env/enviroment';
import { IResult, IRickAndMorty } from '../Models/rick-and-morty,models';
import { Observable } from 'rxjs';
import { IAllResultEpisode, IEpisodes } from '../Models/episodes.models';
@Injectable({
  providedIn: 'root'
})
export class ServiceRickAndMortyService {

  constructor(private httpClient: HttpClient) { }
  getAllCharacters(page:number): Observable<IRickAndMorty> {
    return this.httpClient.get<IRickAndMorty>(`${_hostRickAndMorty}/character/?page=${page}`, )
  }

  getAllEpisodes(page:number): Observable<IEpisodes>{
    return this.httpClient.get<IEpisodes>(`${_hostRickAndMorty}/episode?page=${page}`, )
  }
  getLocations(page: number): Observable<any>{
    return this.httpClient.get<any>(`https://rickandmortyapi.com/api/location/?page=${page}`)
  }
  getSingleEpisode(episode: number): Observable<IAllResultEpisode>{
    return this.httpClient.get<IAllResultEpisode>(`https://rickandmortyapi.com/api/episode/${episode}`)
  }
  getSingleCharacter(character: number): Observable<IResult>{
    return this.httpClient.get<IResult>(`${_hostRickAndMorty}/character/${character}`, )
  }
}
