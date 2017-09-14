import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
//importing woocommerce api as a local variable
import * as WC from 'woocommerce-api';

@IonicPage()
@Component({
  selector: 'page-subcategory',
  templateUrl: 'subcategory.html',
})
export class SubcategoryPage {

  woocommerce: any;
  products: any[];
  cat: string;
  proCat: any[];
  temp2: any[];
  price:any;

  constructor(private modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
    this.cat='fish';
    this.proCat = [];
    this.temp2 = [];

    this.woocommerce = WC({
      url: 'http://localhost/wordpress',
      search: 'fish',
      consumerKey: 'ck_74c037b1ac0167ee23d5b37d0874e83dfe616202',
      consumerSecret: 'cs_c08ff79c1801e705c866858ddb2889d40be5a687'
    });
    this.woocommerce.getAsync('products').then((data) => {
      console.log(JSON.parse(data.body).products);
      this.products = JSON.parse(data.body).products;

      // let temp: any[] = JSON.parse(data.body).products;
      // console.log('temp array', temp);

      // for(var k in temp){
      //        this.temp2 = [temp[k]];
      //        console.log("temp2 categories", this.temp2);
      //   }
      

      // for(let i=0; i < this.temp2.length; i++){
      //   if(this.temp2[i].categories === 'fish'){
      //     this.proCat.push(this.temp2[i]);
      //   }
      //   console.log("fish categories", this.proCat)
      // }

    },(err) => {
      console.log(err);
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubcategoryPage');
  }

  openModal(productDetail){
    const full_desc = this.modalCtrl.create('DescriptionPage', {"product": productDetail});
    full_desc.present();
  }
}
