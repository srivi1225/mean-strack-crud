import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { DataService } from '../data.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [DataService]
})
export class ShoppingListComponent implements OnInit {
shoppingItemList:Item[] = []
selectedItem:Item = null
toggleForm:boolean = false

  constructor(private dataService : DataService) { }

  getItem(){
    this.dataService.getShoppingItems()
    .subscribe( items => {
      this.shoppingItemList = items
      console.log('data from service' + this.shoppingItemList)
    })
  }

  addItem(form){
    console.log(form.value)
    let newItem: Item = {
      itemName: form.value.itemName,
      itemQuantity: form.value.itemQuantity,
      itemBought: false,
      _id:null
    }
    this.dataService.addShoppingItem(newItem)
    .subscribe( items => {
      console.log(items)
      this.getItem()
    })
  }

  deleteItem(id){
    this.dataService.deleteShoppingItem(id)
    .subscribe( item => {
      console.log(item)
      if (item.ok == true) {
        for(var i=0; i<=this.shoppingItemList.length; i++) {
          if(id == this.shoppingItemList[i]._id) {
            this.shoppingItemList.splice(i,1)
          }
        }
      }
    })
  }

  showEditForm(item) {
    this.selectedItem = item;
    this.toggleForm = !this.toggleForm
  }

  editItem(form) {
    console.log(form.value)
    let newItem: Item = {
      itemName: form.value.itemName,
      itemQuantity: form.value.itemQuantity,
      itemBought: this.selectedItem.itemBought,
      _id:this.selectedItem._id
    }
    this.dataService.editShoppingItem(newItem)
    .subscribe( items => {
      console.log(items)
      this.getItem()
    })
    this.toggleForm = !this.toggleForm
  }

  editItemBought(item) {
    item.itemBought = !item.itemBought
    this.dataService.editShoppingItem(item)
    .subscribe( items => {
      console.log(items)
      this.getItem()
    })
  }

  ngOnInit() {
    this.getItem()
  }

}
