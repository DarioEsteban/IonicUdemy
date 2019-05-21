import { Injectable } from '@angular/core';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class WishesService {

  listas : List[] = [];

  constructor() { 
    const list1 = new List('Recolectar piedras del infinito');
    const list2 = new List('Desaparecer heroes');

    this.listas.push(list1, list2);
  }


}
