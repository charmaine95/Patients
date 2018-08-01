import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, MenuController } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // public items : any = [];
  clinicsList = []
  email: string;

  MENU = {
    MATERIAL: 'menu-material',
  };
  
  constructor(public navCtrl: NavController,
              public http   : Http,
              private afAuth: AngularFireAuth,
              private afDatabase: AngularFireDatabase,
              public toastCtrl : ToastController,
              public navParams: NavParams,
              public menuCtrl: MenuController
            ) {
              this.email = afAuth.auth.currentUser.email;

              this.afDatabase.list("clinics").valueChanges().subscribe(_data =>{
                this.clinicsList = _data;

                console.log(this.clinicsList);
              });
  }

  // Only enables right side menu for this page. Testing purposes.
  ionViewWillEnter() {
    this.menuCtrl.enable(true, 'menu-right');
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(false, 'menu-right');
  }
  //end

  ionViewWillLoad(){
    let authSub = this.afAuth.authState.take(1).subscribe(data => {
      if( data && data.email && data.uid){
        this.toastCtrl.create({
          message:`Welcome to iPaQue, ${data.email}`,
          duration: 3000
        }).present();
      }
      else{
        this.toastCtrl.create({
          message: 'Could not found authentication details =(',
          duration: 3000
        }).present();
      }
   })
  }

  user = {
    name: 'Cosima Niehaus',
    twitter: '@CheekyEvoDevo',
    profileImage: 'assets/imgs/home_bg.jpg',
    followers: 456,
    following: 1052,
    tweets: 35
  };

  // imageTapped(post) {
  //   this.toastCtrl.create('Post image clicked');
  // }

  // comment(post) {
  //   this.toastCtrl.create('Comments clicked');
  // }

  // like(post) {
  //   this.toastCtrl.create('Like clicked');
  // }

  changeMenu(menu) {
    // Disables all other sidemenus
    Object.keys(this.MENU).map(k => this.menuCtrl.enable(false, this.MENU[k]));

    // Enables then open the selected menu
    this.menuCtrl.enable(true, menu);
    this.menuCtrl.open(menu);
  }

}
