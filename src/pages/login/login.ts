import { Component } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { NavController } from 'ionic-angular';
import { UserPage } from '../user/user';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  FB_APP_ID: number = 396293507493715;

  constructor(
    public navCtrl: NavController,
    public fb: Facebook,
    public nativeStorage: NativeStorage
    ) {
    this.fb.browserInit(this.FB_APP_ID, "v2.8");
  }

  doFbLogin() {

    let permissions = new Array<string>();
    let nav = this.navCtrl;
    
    //the permissions your facebook app needs from the user
    permissions = ["public_profile","user_friends","manage_pages"];

    // login style 

    /*
      this.fb.login -> RESPONSE
      {
        status: 'connected',
        authResponse: {
          session_key: true,
          accessToken: 'kgkh3g42kh4g23kh4g2kh34g2kg4k2h4gkh3g4k2h4gk23h4gk2h34gk234gk2h34AndSoOn',
          expiresIn: 5183979, milliseconds
          sig: '...',
          secret: '...',
          userID: '634565435'
        }
      }
    */
    /*
      ERROR DE EXPIRACION DE TOKEN 
      {
        "error": {
          "message": "Error validating access token: Session has expired on Thursday, 15-Mar-18 06:00:00 PDT. The current time is Thursday, 15-Mar-18 06:13:46 PDT.",
          "type": "OAuthException",
          "code": 190,
          "error_subcode": 463,
          "fbtrace_id": "Hy8en4lXi/I"
        }
      }
    */
    this.fb.login(permissions)
    .then((response) => {

      let userId = response.authResponse.userID;
      let params = new Array<string>();

      //Getting name and gender properties
      this.fb.api("/me?fields=name,gender", params)
      .then((user) => {

        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";

        this.nativeStorage.setItem('user', // despues de acceder por nlocastrage se puede controlar con then or error
        {
          name: user.name,
          gender: user.gender,
          picture: user.picture,
          userid: userId
        })
        .then(() => {
          nav.push(UserPage);
        },(error) => {
          console.log(error);
        })

      });

    }, (error) => {
      console.log(error);
    });

  } // fin de doFbLogin()
} // fin Class LoginPage
 