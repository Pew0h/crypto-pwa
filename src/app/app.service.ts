import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public pseudo = 'Visiteur';

  constructor(private httpClient: HttpClient) {}

  public getTokens(): Observable<any>{
    return this.httpClient.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc', {responseType: 'json'});
  }

  public getTokenInfo(tokenId: string | null): Observable<any>{
    return this.httpClient.get(`https://api.coingecko.com/api/v3/coins/${tokenId}`, {responseType: 'json'});
  }

  public getPseudo(){
    return this.pseudo;
  }

  public setPseudo(pseudo: string){
    this.pseudo = pseudo;
  }

}
