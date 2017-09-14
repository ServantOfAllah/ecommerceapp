import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as WC from 'woocommerce-api';

@IonicPage()
@Component({
  selector: 'page-description',
  templateUrl: 'description.html',
})
export class DescriptionPage {

  productDetails: any;
  singleProduct: any[];

  constructor(private view: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.productDetails = this.navParams.get('product');
    console.log("Item Details: ", this.productDetails);
    for(var k in this.productDetails){
      this.singleProduct = [this.productDetails[k]];
    }
    console.log("single product: ", this.singleProduct);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DescriptionPage');
    
  }
  closeModal(){
    this.view.dismiss();
  }

}
