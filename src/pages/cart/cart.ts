import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cartItems: any[] = [];
  totalAmt: any;
  showEmptyMsg: boolean = false;
  qtn: number;

  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    this.totalAmt = 0.0;

    //this.storage.clear();

    this.storage.ready().then(()=>{
      this.storage.get('cart').then((data)=>{
        this.cartItems = data;
        console.log("cart items ", this.cartItems);

        if(this.cartItems.length > 0){
          this.cartItems.forEach( (item, index)=>{
            this.totalAmt = this.totalAmt + (item.product.price * item.qtn);
          })//end of foreach loop
        }else{
          this.showEmptyMsg = true;
        }
      })
    });

  }

  decItemQtn(item){

    this.cartItems.forEach( (item, index)=>{
      this.qtn = this.qtn - item.qtn;
    })//end of foreach loop
    this.storage.set('cart', this.cartItems);
    console.log(this.cartItems);

  }

  incItemQtn(item){
    this.qtn = item.qtn;
    this.qtn = this.qtn + 1;
  }

  removeFromCart(item, i){

    let price = item.product.price;
    let qtn = item.qtn;
    //remove an item from the cart array ==> i=index, 1=number of item;
    //this.cartItems.slice(i, 1);
    this.cartItems.pop();
    
    //updating the cart array
    this.storage.set('cart', this.cartItems).then(()=>{
      //getting the new value for total amount
      this.totalAmt = this.totalAmt - (price * qtn);
      console.log("latest ",this.cartItems)
      //qtn = qtn-1;
    });
    this.storage.set('cart', this.cartItems);
    if(this.cartItems.length == 0){
      this.showEmptyMsg = true;
    }

  }

  goTocart(){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

}
