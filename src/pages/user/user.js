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
import { NavController, LoadingController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { LoginPage } from '../login/login';
var UserPage = /** @class */ (function () {
    /*
      returnApplyMediumAritmetic(array){
        var med = array.length;
        var total = 0;
        for(var g = 0; g < array.length; g++){
          total += total[g].value;
        }
        var mediud = (total/med);
        alert(mediud);
        return mediud;
      }
    */
    function UserPage(navCtrl, fb, nativeStorage, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.fb = fb;
        this.nativeStorage = nativeStorage;
        this.loadingCtrl = loadingCtrl;
        this.userReady = false;
        this.FB_APP_ID = 396293507493715;
        this.fb.browserInit(this.FB_APP_ID, "v2.12");
    }
    UserPage.prototype.goToSlide = function () {
        this.slides.slideTo(2, 500);
    };
    UserPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait...",
        });
        loader.present();
        // localstorage get id businnes
        this.nativeStorage.getItem('id_page_bussinnes')
            .then(function (data) {
            var params = new Array();
            // online_followers
            _this.fb.api("" + data + "?fields=biography,id,username,website,followers_count,profile_picture_url", params)
                .then(function (userInstagramData) {
                //alert(JSON.stringify(userInstagramData));
                _this.nativeStorage.setItem('userInstagramData', userInstagramData);
                _this.user = {
                    "username": userInstagramData.username,
                    "website": userInstagramData.website,
                    "followers_count": userInstagramData.followers_count,
                    "profile_picture_url": userInstagramData.profile_picture_url
                }; // impression data ////
                //alert(JSON.stringify(this.user));
                _this.fb.api("" + data + "/insights?metric=impressions,follower_count,profile_views,website_clicks&period=day&since=1519257600&until=1521676800", params)
                    .then(function (insightsUser1) {
                    //alert(JSON.stringify(insightsUser1.data[0]));
                    var useruserImpresions2 = insightsUser1.data[0]; // impresion data //
                    var userFllowersCount2 = insightsUser1.data[1]; // followers data //
                    var userProfile_views2 = insightsUser1.data[2]; // prfiles views data //
                    var userWebsite_clicks2 = insightsUser1.data[3]; // website clicks views data //
                    useruserImpresions2 = useruserImpresions2.values.reverse();
                    userFllowersCount2 = userFllowersCount2.values.reverse();
                    userProfile_views2 = userProfile_views2.values.reverse();
                    userWebsite_clicks2 = userWebsite_clicks2.values.reverse();
                    var med = userWebsite_clicks2.length;
                    var totalImpresions2 = 0;
                    var totalFllowersCount2 = 0;
                    var totalProfile_views2 = 0;
                    var totalWebsite_clicks2 = 0;
                    for (var g = 0; g < userWebsite_clicks2.length; g++) {
                        totalWebsite_clicks2 += userWebsite_clicks2[g].value;
                        totalProfile_views2 += userProfile_views2[g].value;
                        totalFllowersCount2 += userFllowersCount2[g].value;
                        totalImpresions2 += useruserImpresions2[g].value;
                        // diference counts
                        if (g == userWebsite_clicks2.length - 1) {
                            userWebsite_clicks2[g]["diference"] = 0;
                            userProfile_views2[g]["diference"] = 0;
                            userFllowersCount2[g]["diference"] = 0;
                            useruserImpresions2[g]["diference"] = 0;
                            //userWebsite_clicks2[g]["diferenceInt"] = 0;
                            //userProfile_views2[g]["diferenceInt"]  = 0;
                            //userFllowersCount2[g]["diferenceInt"]  = 0;
                            //useruserImpresions2[g]["diferenceInt"] = 0;
                        }
                        else {
                            var dff = userWebsite_clicks2[g].value - userWebsite_clicks2[g + 1].value;
                            //var dff2 = parseInt(dff);
                            userWebsite_clicks2[g]["diference"] = dff;
                            //userWebsite_clicks2[g]["diferenceInt"] = dff2;
                            dff = userProfile_views2[g].value - userProfile_views2[g + 1].value;
                            //dff2 = parseInt(dff);
                            userProfile_views2[g]["diference"] = dff;
                            //userProfile_views2[g]["diferenceInt"] = dff2;
                            dff = userFllowersCount2[g].value - userFllowersCount2[g + 1].value;
                            //dff2 = parseInt(dff);
                            userFllowersCount2[g]["diference"] = dff;
                            //userFllowersCount2[g]["diferenceInt"] = dff2;
                            dff = useruserImpresions2[g].value - useruserImpresions2[g + 1].value;
                            //dff2 = parseInt(dff);
                            useruserImpresions2[g]["diference"] = dff;
                            //useruserImpresions2[g]["diferenceInt"] = dff2;  
                        }
                    }
                    //alert(JSON.stringify(userWebsite_clicks2));
                    var mediumWebsite_clicks = (totalWebsite_clicks2 / med);
                    var mediumImpresions = (totalImpresions2 / med);
                    var mediumFllowersCount = (totalFllowersCount2 / med);
                    var mediumProfile_views = (totalProfile_views2 / med);
                    // mdiuems scopes
                    _this.mediumImpresions = mediumImpresions.toFixed(2);
                    _this.mediumFllowersCount = mediumFllowersCount.toFixed(2);
                    _this.mediumProfile_views = mediumProfile_views.toFixed(2);
                    _this.mediumWebsite_clicks = mediumWebsite_clicks.toFixed(2);
                    // 30 dyas imformation
                    _this.userImpresions = useruserImpresions2;
                    _this.userFllowersCount = userFllowersCount2;
                    _this.userProfile_views = userProfile_views2;
                    _this.userWebsite_clicks = userWebsite_clicks2;
                    //alert(this.userWebsite_clicks[2]["diference"]);
                    _this.userReady = true;
                    loader.dismiss();
                }, function (error) {
                    alert(JSON.stringify(error));
                });
            }, function (error) {
                alert(JSON.stringify(error));
            });
        }, function (error) {
            alert("datos de usuario perdidos de ocal");
            console.log(error);
        });
    }; // FIN DE IONIC VIEW ENTER
    // action logout since button in view
    UserPage.prototype.doFbLogout = function () {
        var _this = this;
        var nav = this.navCtrl;
        this.fb.logout()
            .then(function (response) {
            //user logged out so we will remove him from the NativeStorage
            _this.nativeStorage.remove('user');
            nav.push(LoginPage);
        }, function (error) {
            console.log(error);
        });
    };
    UserPage = __decorate([
        Component({
            selector: 'page-user',
            templateUrl: 'user.html'
        }),
        __metadata("design:paramtypes", [NavController,
            Facebook,
            NativeStorage,
            LoadingController])
    ], UserPage);
    return UserPage;
}());
export { UserPage };
/*



audience_gender_age (only accepts lifetime timeframe)
audience_locale (only accepts lifetime timeframe)
audience_country (only accepts lifetime timeframe)
audience_city (only accepts lifetime timeframe)
online_followers (only accepts lifetime timeframe)

{
  "data": [
    {
      "name": "impressions",
      "period": "day",
      "values": [
        {
          "value": 0,
          "end_time": "2018-03-20T07:00:00+0000"
        },
        {
          "value": 0,
          "end_time": "2018-03-21T07:00:00+0000"
        }
      ],
      "title": "Impressions",
      "description": "Total number of times this profile has been seen",
      "id": "17841407208921643/insights/impressions/day"
    },
    {
      "name": "reach",
      "period": "day",
      "values": [
        {
          "value": 0,
          "end_time": "2018-03-20T07:00:00+0000"
        },
        {
          "value": 0,
          "end_time": "2018-03-21T07:00:00+0000"
        }
      ],
      "title": "Reach",
      "description": "Total number of unique accounts that have seen this profile",
      "id": "17841407208921643/insights/reach/day"
    },
    {
      "name": "profile_views",
      "period": "day",
      "values": [
        {
          "value": 1,
          "end_time": "2018-03-20T07:00:00+0000"
        },
        {
          "value": 0,
          "end_time": "2018-03-21T07:00:00+0000"
        }
      ],
      "title": "Profile Views",
      "description": "Total number of unique accounts that have viewed this profile within the specified period",
      "id": "17841407208921643/insights/profile_views/day"
    }
  ],
  "paging": {
    "previous": "https://graph.facebook.com/v2.12/17841407208921643/insights?access_token=EAAFobUW9r1MBANlxqPkTPmYTRdZAZBUpknOjKCSwI8EOZBqpLdSXqNXVFhxo3xHRQ4hknDOqbD42WDGRrq4D74KGdVjfEXRZAje2ZBW2tZAfkkMIhPiplwrDRnZAfZBShcNWz4OWFFfiSZBql7T0DSQvDSZAoN0DYuZBYNZBzlaHJyZAwPSDR9xGop3sfUEAXQkF44yCIGWBWizg0eQZDZD&pretty=0&metric=impressions%2Creach%2Cprofile_views&period=day&since=1521304742&until=1521477542",
    "next": "https://graph.facebook.com/v2.12/17841407208921643/insights?access_token=EAAFobUW9r1MBANlxqPkTPmYTRdZAZBUpknOjKCSwI8EOZBqpLdSXqNXVFhxo3xHRQ4hknDOqbD42WDGRrq4D74KGdVjfEXRZAje2ZBW2tZAfkkMIhPiplwrDRnZAfZBShcNWz4OWFFfiSZBql7T0DSQvDSZAoN0DYuZBYNZBzlaHJyZAwPSDR9xGop3sfUEAXQkF44yCIGWBWizg0eQZDZD&pretty=0&metric=impressions%2Creach%2Cprofile_views&period=day&since=1521650342&until=1521823142"
  }
}
*/
//# sourceMappingURL=user.js.map