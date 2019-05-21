import { ListItem } from './list-item.model';

export class List{

    id: number;
    title: string;
    created: Date;
    finished: Date;
    complete: boolean;
    items: ListItem[];

    constructor(title: string){
        this.title = title;
        this.created = new Date();
        this.complete = false;
        this.items = [];

        this.id = new Date().getTime();
    }
}