import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../../models/user';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder } from '@angular/forms';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(public navCtrl    : NavController, 
              public NP         : NavParams,
              private afuth     : AngularFireAuth,
              public http       : Http,
              public fb         : FormBuilder,
               public toastCtrl : ToastController
            ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async register(user: User){
    try{
    const result = await this.afuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    console.log(result);
  
    if(result){
    this.navCtrl.setRoot(HomePage);
    }
  
    }
    catch(e){
    console.error(e);
    }
    }
     

}
