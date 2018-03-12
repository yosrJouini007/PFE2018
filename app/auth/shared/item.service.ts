import { Injectable } from "@angular/core";

class Item {
    id: number;
    name: string;
    role: string;
}

@Injectable()
export class ItemService {
    private items = new Array<Item>(
        
    );

    getItems(): Item[] {
        return this.items;
    }

    getItem(id: number): Item {
        return this.items.filter(item => item.id === id)[0];
    }
}