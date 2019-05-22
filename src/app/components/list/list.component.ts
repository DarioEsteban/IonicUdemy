import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { WishesService } from 'src/app/services/wishes.service';
import { List } from 'src/app/models/list.model';
import { Router } from '@angular/router';
import { ListItem } from 'src/app/models/list-item.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {

  constructor(public wishesService : WishesService,
              private router : Router,
              private alerCtrl : AlertController) {

   }

   @ViewChild(IonList) ionList: IonList;
   @Input() finished = true;

  selectedList(list : List){
    const idList = list.id;

    if(this.finished){
      this.router.navigateByUrl(`/tabs/tab2/add/${idList}`);
    }else {
      this.router.navigateByUrl(`/tabs/tab1/add/${idList}`);
    }

    
  }

  deleteList( list : List ){
    this.wishesService.deleteList(list);
  }

  async editName( list : List ){
    const alert = await this.alerCtrl.create({
      header: 'Editar titulo lista',
      inputs : [
        {
          name: 'titulo',
          type: 'text',
          value: list.title,
          placeholder: 'Nomdre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
            this.ionList.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            console.log(data);
            if (data.titulo.length === 0){ return; }
            list.title = data.titulo;
            this.wishesService.saveStorage();
            this.ionList.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();
  }

}
