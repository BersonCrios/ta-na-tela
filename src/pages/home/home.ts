import { DetailsPage } from './../details/details';
import { FilmesProvider } from "./../../providers/filmes/filmes";
import { Component } from "@angular/core";
import { NavController, LoadingController } from "ionic-angular";
import { log } from 'util';

@Component({
  selector: "page-home",
  templateUrl: "home.html",

  providers: [FilmesProvider]
})
export class HomePage {

  public lista_filmes = new Array<any>();
  public recarrega;
  public ehRecarregado: boolean = false;
  public loader;
  public page = 1;

  public scroolInfinito;
  constructor(
    public navCtrl: NavController,
    private filmesProvider: FilmesProvider,
    public loadingCtrl: LoadingController
  ) {}

  abrirCarregamento() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();
  }

  fecharCarregamento(){
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    this.recarrega = refresher;
    this.ehRecarregado = true;
    this.carregarFilmes();
  }

  ionViewDidEnter(){
    this.carregarFilmes();
  }

  private carregarFilmes(newpage:boolean = false) {
    this.abrirCarregamento();
    this.filmesProvider.getUltimosFilmes(this.page).subscribe(data => {
      const response = (data as any);
      const objeto = JSON.parse(response._body);
      console.log(objeto);

      if(newpage){
        this.lista_filmes = this.lista_filmes.concat(objeto.results);
        this.scroolInfinito.complete();
      }
      else{
        this.lista_filmes = objeto.results;
      }

      this.fecharCarregamento();
      if (this.ehRecarregado) {
        this.recarrega.complete();
        this.ehRecarregado = false;
      }
    }, error => {
      console.log(error);
      this.fecharCarregamento();
      if (this.ehRecarregado) {
        this.recarrega.complete();
        this.ehRecarregado = false;
      }
    });
  }

  abrirDetalhes(filme){
    console.log(filme.id);
    this.navCtrl.push(DetailsPage, {id: filme.id});
  }


  doInfinite(infiniteScroll) {
    this.page++;
    this.scroolInfinito = infiniteScroll;
    this.carregarFilmes(true);
  }
}
