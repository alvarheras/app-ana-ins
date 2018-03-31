import { Component } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { NavController,LoadingController } from 'ionic-angular';
import { UserPage } from '../user/user';
import { LoginPage } from '../login/login';

/**
 * Generated class for the LoginBusinessPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login-business',
  templateUrl: 'login-business.html',
})
export class LoginBusinessPage {

  pages = [];
  pagesReady: boolean = true;
  userReady: boolean = false;
  FB_APP_ID: number = 396293507493715;

  constructor( 
  	public navCtrl: NavController,
    public fb: Facebook,
    public nativeStorage: NativeStorage,
    public loadingCtrl: LoadingController
  ) 
  {
  	this.fb.browserInit(this.FB_APP_ID, "v2.12");
  }





  ionViewDidLoad() {


   
  }

  loginWithThisPage(page) {
  	let nav = this.navCtrl;
  	let params = new Array<string>();
  	this.fb.api(""+page.id+"?fields=instagram_business_account",params)
    .then((data) => {
    	if(data.instagram_business_account !== undefined) {
    		this.nativeStorage.setItem('id_page_bussinnes', data.instagram_business_account.id ); // save businness account
	    	nav.push(UserPage);
    	} else {
    		alert("no es busiines");
    	}
    	//alert(JSON.stringify(data));
    },(error) => {
    	alert(JSON.stringify(error));
      	console.log(error);
    })
  }

  doFbLoginBusinnes(){

    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });

  	let nav = this.navCtrl;
  	let permissions = ["manage_pages"];
  	this.fb.login(permissions)
  	.then((response) => {

        loader.present();

  	    //alert(JSON.stringify(response));
  	    let params = new Array<string>();

  	    this.nativeStorage.setItem('user_manage_pages', // despues de acceder por nlocastrage se puede controlar con then or error
  	    {
  	       token: response.authResponse.accessToken,
  	       expiresIn: response.authResponse.expiresIn,
  	       userid: response.authResponse.userID,
  	       ession_key: response.authResponse.session_key
  	    })

  	    this.fb.api("/me/accounts?type=page",params)
  	    .then((cuentass) => {
  	      	// .id
  	      	//alert(JSON.stringify(cuentass.data));
  	      	this.nativeStorage.setItem('user_pages', JSON.stringify(cuentass.data) );
  	      	this.pages = cuentass.data;
  	      	let businnesPages = "";
  	      	this.pagesReady = false;

            setTimeout(() => {
              this.userReady =true;
              loader.dismiss();
            }, 1500);
  	      	/*for (let pages2 of cuentass.data) {}*/
            
  	    },(error) => {
  	      	alert(JSON.stringify(error));
  	      	console.log(error);
  	    })

  	}, (error) => {
  	    alert(error);
  	    console.log(error);
  	});

  }


}
