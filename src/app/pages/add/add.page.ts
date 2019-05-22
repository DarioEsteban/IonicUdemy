import { Component, OnInit } from '@angular/core';
import { WishesService } from 'src/app/services/wishes.service';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { ListItem } from 'src/app/models/list-item.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  list : List;
  nameItem = '';

  constructor(private wishesService : WishesService,
              private route : ActivatedRoute) {
    const idList = this.route.snapshot.paramMap.get('idList');
    this.list = this.wishesService.getList(idList);
    
   }

   addItem(){
    if (this.nameItem.length === 0){
      return;
    }

    const newItem = new ListItem(this.nameItem);
    this.list.items.push(newItem);

    this.nameItem = '';
    this.wishesService.saveStorage();
   }

   changedCheck(item : ListItem){
    
    const pending = this.list.items.filter( itemData => !itemData.complete).length;

    if (pending === 0) {
      this.list.finished = new Date();
      this.list.complete = true;
    } else {
      this.list.finished = null;
      this.list.complete = false;
    }
    
    this.wishesService.saveStorage();
   }

   delete( i : number){
    this.list.items.splice(i, 1);
    this.wishesService.saveStorage();
   }

  ngOnInit() {
  }

}
