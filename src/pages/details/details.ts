import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { log } from "util";
import { FilmesProvider } from "../../providers/filmes/filmes";

@IonicPage()
@Component({
  selector: "page-details",
  templateUrl: "details.html",
  providers: [FilmesProvider]
})
export class DetailsPage {
  public filme;
  public filmeid;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private filmesProvider: FilmesProvider
  ) {}

  ionViewDidEnter() {
    this.filmeid = this.navParams.get("id");
    console.log(this.filmeid);

    this.filmesProvider.getDetalhesFilmes(this.filmeid).subscribe(data => {
      let retorno = (data as any)._body;
      this.filme = JSON.parse(retorno);

      console.log(this.filme);

    }, error => {
      console.log(error);
    });
  }
}
