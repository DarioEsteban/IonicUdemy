import { Injectable } from '@angular/core';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class WishesService {

  listas : List[] = [];

  constructor() { 
    this.chargeStorage();
  }

  createList(title : string){
    const newList = new List(title);
    this.listas.push(newList);
    this.saveStorage();

    return newList.id;
  }

  deleteList(list : List){
    this.listas = this.listas.filter( listData => listData.id !== list.id);

    this.saveStorage();
  }

  getList(id : string | number){
    id = Number(id);

    return this.listas.find( listData => listData.id === id);
  }

  saveStorage(){
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  chargeStorage(){

    if (localStorage.getItem('data')){
      this.listas = JSON.parse(localStorage.getItem('data'));
    } else { this.listas = []; }
  }

}
