import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, LoadingController, App } from 'ionic-angular';

import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { RegisterPage } from '../register/register';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  public backgroundImage = 'assets/icon/bg.jpg';
  
  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               private afuth: AngularFireAuth,
               public loadingCtrl: LoadingController,
               public app: App ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(user:User){
    try{
    const result = await this.afuth.auth.signInWithEmailAndPassword(user.email, user.password);
    console.log(result);
  
    if(result){
    this.navCtrl.setRoot(HomePage);
    }
  
    }
    catch(e){
    console.error(e);
    }
    }
  
    //slider methods
    @ViewChild('slider') slider: Slides;
    @ViewChild('innerSlider') innerSlider: Slides;

    register(){
    this.navCtrl.push(RegisterPage);
    }

    goToLogin() {
      this.slider.slideTo(1);
    }
  
    goToSignup() {
      this.slider.slideTo(2);
    }

    //signup
    async signup(user: User){
      try{
      const result = await this.afuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
    
      if(result){HomePage
      this.navCtrl.setRoot(HomePage);
      }
    
      }
      catch(e){
      console.error(e);
      }
      }

}
