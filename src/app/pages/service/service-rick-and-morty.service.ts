import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _hostRickAndMorty } from 'src/app/env/enviroment';
import { IResult, IRickAndMorty } from '../Models/rick-and-morty,models';
import { Observable } from 'rxjs';
import { IEpisodes } from '../Models/episodes.models';
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

  getSingleCharacter(character: number): Observable<IResult>{
    return this.httpClient.get<IResult>(`${_hostRickAndMorty}/character/${character}`, )
  }
}
