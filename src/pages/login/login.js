var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { NavController } from 'ionic-angular';
import { LoginBusinessPage } from '../login-business/login-business';
import { UserPage } from '../user/user';
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, fb, nativeStorage) {
        this.navCtrl = navCtrl;
        this.fb = fb;
        this.nativeStorage = nativeStorage;
        this.FB_APP_ID = 396293507493715;
        this.fb.browserInit(this.FB_APP_ID, "v2.12");
    }
    LoginPage.prototype.ionViewCanEnter = function () {
        var nav = this.navCtrl;
        this.nativeStorage.getItem('id_page_bussinnes')
            .then(function (data) {
            if (data !== "") {
                // habria que chekear el token aqui
                nav.push(UserPage);
            }
            else {
            }
        }, function (error) {
            alert(error);
            console.log(error);
        });
    };
    LoginPage.prototype.doFbLogin = function () {
        var _this = this;
        var permissions = new Array();
        var nav = this.navCtrl;
        //the permissions your facebook app needs from the user
        //permissions = ["public_profile,manage_pages,instagram_basic,instagram_manage_insights"];
        //permissions = ["public_profile,manage_pages,instagram_basic,instagram_manage_insights"];
        this.fb.login(["public_profile"])
            .then(function (response) {
            alert(JSON.stringify(response));
            var userId = response.authResponse.userID;
            var tokenUser = response.authResponse.accessToken;
            var expiredin = response.authResponse.expiresIn;
            //double authenticatiuon
            /*
            let params = new Array<string>();
            this.fb.login(["manage_pages,pages_show_list,instagram_basic,instagram_manage_insights"])
            .then((response) => {
              alert(JSON.stringify(response));
            },(error) => {
              alert(JSON.stringify(error));
              console.log(error);
            })*/
            var params = new Array();
            _this.fb.api("/me?fields=name", params)
                .then(function (user) {
                user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
                _this.nativeStorage.setItem('user', // despues de acceder por nlocastrage se puede controlar con then or error
                {
                    name: user.name,
                    picture: user.picture,
                    userid: userId,
                    tokenUser: tokenUser,
                    expiredin: expiredin
                });
                nav.push(LoginBusinessPage);
            }, function (error) {
                alert(JSON.stringify(error));
                console.log(error);
            });
        }, function (error) {
            alert(error);
            console.log(error);
        });
    }; // fin Class LoginPage
    LoginPage = __decorate([
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [NavController,
            Facebook,
            NativeStorage])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
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
//# sourceMappingURL=login.js.map