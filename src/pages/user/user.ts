import { Component } from '@angular/core';
import { NavController,LoadingController,Slides } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { LoginPage } from '../login/login';
import { LoginBusinessPage } from '../login-business/login-business';
import { ChartReportPage } from '../chart-report/chart-report';
import * as moment from 'moment';


@Component({
  selector: 'page-user', // el selector solo tiene utilidad en el css que se crea dentro de la carpeta del propio componente
  templateUrl: 'user.html'
})

export class UserPage {

  user: any;
  userImpresions: any;
  userFllowersCount: any;
  userProfile_views: any;
  userWebsite_clicks: any;
  userReady: boolean = false;
  mediumWebsite_clicks: any;
  mediumImpresions: any;
  mediumFllowersCount: any;
  mediumProfile_views: any;
  colorRed: any;

  diaInicio: any;
  diaFinal: any;

  FB_APP_ID: number = 396293507493715;

  slides: Slides;
  goToSlide() {
    this.slides.slideTo(2, 500);
  }
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

  constructor(
    public navCtrl: NavController,
    public fb: Facebook,
    public nativeStorage: NativeStorage,
    public loadingCtrl: LoadingController
  ) {
    this.fb.browserInit(this.FB_APP_ID, "v2.12");
  }


  // esta pagina se alamazena en cache solo cargara la primera vez
  ionViewDidLoad() { 

    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();

    // CALCULATE DATES
    this.diaFinal = moment().unix();
    this.diaInicio = moment().subtract(30, 'days').unix();

    // localstorage get id businnes
    this.nativeStorage.getItem('id_page_bussinnes')
    .then((data) => {

        let params = new Array<string>();
        // online_followers

        this.fb.api(""+data+"?fields=biography,id,username,website,followers_count,profile_picture_url",params)
        .then((userInstagramData) => {

              //alert(JSON.stringify(userInstagramData));
              this.nativeStorage.setItem('userInstagramData', userInstagramData );
              this.user = {
                  "username": userInstagramData.username,
                  "website":userInstagramData.website,
                  "followers_count":userInstagramData.followers_count,
                  "profile_picture_url":userInstagramData.profile_picture_url
              }; // impression data ////
              //alert(JSON.stringify(this.user));
              this.fb.api(""+data+"/insights?metric=impressions,follower_count,profile_views,website_clicks&period=day&since="+this.diaInicio+"&until="+this.diaFinal+"",params)
              .then((insightsUser1) => {
    
                  //alert(JSON.stringify(insightsUser1.data[0]));
                  var useruserImpresions2 = insightsUser1.data[0];   // impresion data //
                  var userFllowersCount2 = insightsUser1.data[1];   // followers data //
                  var userProfile_views2 = insightsUser1.data[2];  // prfiles views data //
                  var userWebsite_clicks2= insightsUser1.data[3]; // website clicks views data //

                  useruserImpresions2 = useruserImpresions2.values.reverse();
                  userFllowersCount2 = userFllowersCount2.values.reverse();
                  userProfile_views2 = userProfile_views2.values.reverse();
                  userWebsite_clicks2 = userWebsite_clicks2.values.reverse();

                  var med = userWebsite_clicks2.length;
                  var totalImpresions2 = 0;
                  var totalFllowersCount2 = 0;
                  var totalProfile_views2 = 0;
                  var totalWebsite_clicks2 = 0;

                  for(var g = 0; g < userWebsite_clicks2.length; g++) {

                      totalWebsite_clicks2 += userWebsite_clicks2[g].value; 
                      totalProfile_views2 += userProfile_views2[g].value;
                      totalFllowersCount2 += userFllowersCount2[g].value;
                      totalImpresions2 += useruserImpresions2[g].value;

                      // diference counts
                      if(g == userWebsite_clicks2.length-1) {

                        userWebsite_clicks2[g]["diference"] = 0;
                        userProfile_views2[g]["diference"]  = 0;
                        userFllowersCount2[g]["diference"]  = 0;
                        useruserImpresions2[g]["diference"] = 0;

                        //userWebsite_clicks2[g]["diferenceInt"] = 0;
                        //userProfile_views2[g]["diferenceInt"]  = 0;
                        //userFllowersCount2[g]["diferenceInt"]  = 0;
                        //useruserImpresions2[g]["diferenceInt"] = 0;

                      } else {

                        var dff = userWebsite_clicks2[g].value-userWebsite_clicks2[g+1].value;
                        var streetaddress= userWebsite_clicks2[g].end_time.substr(0, userWebsite_clicks2[g].end_time.indexOf('T')); 
                        userWebsite_clicks2[g]["end_time"] = streetaddress;
                        userWebsite_clicks2[g]["diference"] = dff;


                        dff = userProfile_views2[g].value-userProfile_views2[g+1].value;
                        streetaddress = userProfile_views2[g].end_time.substr(0, userProfile_views2[g].end_time.indexOf('T'));
                        userProfile_views2[g]["end_time"] = streetaddress;
                        userProfile_views2[g]["diference"] = dff;

                        dff = userFllowersCount2[g].value-userFllowersCount2[g+1].value;
                        streetaddress= userFllowersCount2[g].end_time.substr(0, userFllowersCount2[g].end_time.indexOf('T'));
                        userFllowersCount2[g]["end_time"] = streetaddress;
                        userFllowersCount2[g]["diference"] = dff;

                        dff = useruserImpresions2[g].value-useruserImpresions2[g+1].value;
                        streetaddress= useruserImpresions2[g].end_time.substr(0, useruserImpresions2[g].end_time.indexOf('T'));
                        useruserImpresions2[g]["end_time"] = streetaddress;
                        useruserImpresions2[g]["diference"] = dff;   


                      }

                  }
             
                  //alert(JSON.stringify(userWebsite_clicks2));
                  var mediumWebsite_clicks = totalWebsite_clicks2;
                  var mediumImpresions = totalImpresions2;
                  var mediumFllowersCount = totalFllowersCount2;
                  var mediumProfile_views = totalProfile_views2;
                  // mdiuems scopes
                  this.mediumImpresions = mediumImpresions.toFixed(0);
                  this.mediumFllowersCount = mediumFllowersCount.toFixed(0);
                  this.mediumProfile_views = mediumProfile_views.toFixed(0);
                  this.mediumWebsite_clicks = mediumWebsite_clicks.toFixed(0);
                  // 30 dyas imformation
                  this.userImpresions = useruserImpresions2;
                  this.userFllowersCount = userFllowersCount2;
                  this.userProfile_views = userProfile_views2;
                  this.userWebsite_clicks = userWebsite_clicks2;

                  //alert(this.userWebsite_clicks[2]["diference"]);
                  setTimeout(() => {
                    this.userReady = true;
                    loader.dismiss();
                  }, 1500);
                  //alert("llega");
              
              },(error) => {
                  alert(JSON.stringify(error));
              })
            
        },(error) => {
              alert(JSON.stringify(error));
        })

    }, (error) => { // get data storage
      alert("datos de usuario perdidos de ocal");
      console.log(error);
    });


  } // FIN DE IONIC VIEW ENTER


  reportinThisImpressions() {
    var nav = this.navCtrl;
    nav.push(ChartReportPage,{"arrayApintar":this.userImpresions,"name":"Impresions"},{animate: true, direction: 'forward'});
  }

  reportinThisFllowersCount() {
    var nav = this.navCtrl;
    nav.push(ChartReportPage,{"arrayApintar":this.userFllowersCount,"name":"Followers"},{animate: true, direction: 'forward'});
  }

  reportinThisProfile_views() {
    var nav = this.navCtrl;
    nav.push(ChartReportPage,{"arrayApintar":this.userProfile_views,"name":"Profile Views"},{animate: true, direction: 'forward'});
  }

  reportinThisWebsite_clicks() {
    var nav = this.navCtrl;
    nav.push(ChartReportPage,{"arrayApintar":this.userWebsite_clicks,"name":"Website Clicks"},{animate: true, direction: 'forward'});
  }


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
