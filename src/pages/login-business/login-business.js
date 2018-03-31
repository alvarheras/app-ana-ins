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
import { UserPage } from '../user/user';
/**
 * Generated class for the LoginBusinessPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var LoginBusinessPage = /** @class */ (function () {
    function LoginBusinessPage(navCtrl, fb, nativeStorage) {
        this.navCtrl = navCtrl;
        this.fb = fb;
        this.nativeStorage = nativeStorage;
        this.pages = [];
        this.pagesReady = true;
        this.userReady = false;
        this.FB_APP_ID = 396293507493715;
        this.fb.browserInit(this.FB_APP_ID, "v2.12");
    }
    LoginBusinessPage.prototype.ionViewDidLoad = function () {
    };
    LoginBusinessPage.prototype.loginWithThisPage = function (page) {
        var _this = this;
        var nav = this.navCtrl;
        var params = new Array();
        this.fb.api("" + page.id + "?fields=instagram_business_account", params)
            .then(function (data) {
            if (data.instagram_business_account !== undefined) {
                _this.nativeStorage.setItem('id_page_bussinnes', data.instagram_business_account.id); // save businness account
                nav.push(UserPage);
            }
            else {
                alert("no es busiines");
            }
            alert(JSON.stringify(data));
        }, function (error) {
            alert(JSON.stringify(error));
            console.log(error);
        });
    };
    LoginBusinessPage.prototype.doFbLoginBusinnes = function () {
        var _this = this;
        var nav = this.navCtrl;
        var permissions = ["manage_pages"];
        this.fb.login(permissions)
            .then(function (response) {
            alert(JSON.stringify(response));
            var params = new Array();
            _this.nativeStorage.setItem('user_manage_pages', // despues de acceder por nlocastrage se puede controlar con then or error
            {
                token: response.authResponse.accessToken,
                expiresIn: response.authResponse.expiresIn,
                userid: response.authResponse.userID,
                ession_key: response.authResponse.session_key
            });
            _this.fb.api("/me/accounts?type=page", params)
                .then(function (cuentass) {
                // .id
                //alert(JSON.stringify(cuentass.data));
                _this.nativeStorage.setItem('user_pages', JSON.stringify(cuentass.data));
                _this.pages = cuentass.data;
                var businnesPages = "";
                _this.pagesReady = false;
                _this.userReady = true;
                /*for (let pages2 of cuentass.data) {}*/
            }, function (error) {
                alert(JSON.stringify(error));
                console.log(error);
            });
        }, function (error) {
            alert(error);
            console.log(error);
        });
    };
    LoginBusinessPage = __decorate([
        Component({
            selector: 'page-login-business',
            templateUrl: 'login-business.html',
        }),
        __metadata("design:paramtypes", [NavController,
            Facebook,
            NativeStorage])
    ], LoginBusinessPage);
    return LoginBusinessPage;
}());
export { LoginBusinessPage };
//# sourceMappingURL=login-business.js.map