import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-user', // el selector solo tiene utilidad en el css que se crea dentro de la carpeta del propio componente
  templateUrl: 'user.html'
})

export class UserPage {

  user: any;
  userReady: boolean = false;

  constructor(
    public navCtrl: NavController,
    public fb: Facebook,
    public nativeStorage: NativeStorage
  ) {}

  ionViewCanEnter() { // cuando el usuario entre a la pagina

    // localstorage
    this.nativeStorage.getItem('user')
    .then((data) => {

      this.user = {
        name: data.name,
        gender: data.gender,
        picture: data.picture
      };

      // get pages id instagram businnes
      alert(data.userId);
      let params = new Array<string>();
      this.fb.api("/"+data.userId+"/accounts?type=page", params)
      .then((pages) => {
        alert(pages);
        console.log(pages);
      },(error) => {
        alert(error);
        console.log(error);
      });

      this.userReady = true;

    }, (error) => {
      console.log(error);
    });


  } // FIN DE IONIC VIEW ENTER

  // action logout since button in view
  doFbLogout(){
    var nav = this.navCtrl;
    this.fb.logout()
    .then((response) => {
      //user logged out so we will remove him from the NativeStorage
      this.nativeStorage.remove('user');
      nav.push(LoginPage);
    }, (error) => {
      console.log(error);
    });
  }

}
