import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as WC from 'woocommerce-api';

@IonicPage()
@Component({
  selector: 'page-description',
  templateUrl: 'description.html',
})
export class DescriptionPage {

  productDetails = [];
  product:any;
  proArr: any[];
  icon: string;

  constructor(private storage: Storage, private view: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.productDetails = [this.navParams.get('product')];
    console.log("Item Details from desc page: ", typeof(this.productDetails));
    console.log("Item Details from desc page: ", this.productDetails);

    //converting product array to object (doesnt matter);
    this.product = this.navParams.get('product');
    console.log("Item Details ", typeof(this.product));

    this.icon = 'ios-add';
  }

  toggleDiv(data){
    data.icon = 'ios-add';
    if(data.showDetails){
      data.showDetails = false;
      data.icon = 'ios-add';
    }else{
      data.showDetails = true;
      data.icon = 'ios-remove';
    }
  }

  addToCart(product){
    this.storage.get('cart').then((data)=>{
      
      //checking if data is null or 0
      if(data == null || data.length == 0){
        //innitial data as blank array and push the object into the array
        data = [];
        data.push({
          'product': this.product,
          'qtn': 1,
          'amt': parseFloat(this.product.price)
        });
        console.log(data);
      }else{
        let added = 0;
        //for loop to loop tru all product in the cart
        for(let i=0; i < data.length; i++){
          //if product is the same product in the cart increment its quanity
          if(this.product.id == data[i].product.id){
            console.log('product already in the cart');
            let qtn = data[i].qtn;
            data[i].qtn = qtn + 1;
            data[i].amt = parseFloat(data[i].amt) + parseFloat(data[i].product.price);
            added = 1; 
          }
        }
        if(added == 0){
          data.push({
            'product': this.product,
            'qtn': 1,
            'amt': parseFloat(this.product.price)
          });
        }
      }

      //update cart in the local storage
      this.storage.set('cart', data).then( ()=>{
        console.log('cart updated');
        console.log("final",data);
      });

    },)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DescriptionPage');
  }
  closeModal(){
    this.view.dismiss();
  }

}
