import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class FilmesProvider {
  private API = "https://api.themoviedb.org/3";

  constructor(public http: Http) {}

  getUltimosFilmes(page = 1) {
    return this.http.get(
      this.API + `/movie/popular?page=${page}&api_key=16e57ee6b11d80e1b5a57293c45bb942`
    );
  }

  getDetalhesFilmes(filmeid){
    return this.http.get(
      this.API + `/movie/${filmeid}?api_key=16e57ee6b11d80e1b5a57293c45bb942`
    );
  }
}
