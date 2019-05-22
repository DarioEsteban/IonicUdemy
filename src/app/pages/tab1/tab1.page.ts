import { Component } from '@angular/core';
import { WishesService } from 'src/app/services/wishes.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public wishesService: WishesService,
              private router : Router,
              private alerCtrl : AlertController){
      
    }

  async addList(){
    //this.router.navigateByUrl('/tabs/tab1/add');
    const alert = await this.alerCtrl.create({
      header: 'Nueva lista',
      inputs : [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nomdre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data) => {
            console.log(data);
            if (data.titulo.length === 0){ return; }

            const idList = this.wishesService.createList(data.titulo);
            this.router.navigateByUrl(`/tabs/tab1/add/${idList}`);
          }
        }
      ]
    });

    alert.present();
  }
  
}
