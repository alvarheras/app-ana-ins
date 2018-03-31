import { NavController, LoadingController, Slides } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
export declare class UserPage {
    navCtrl: NavController;
    fb: Facebook;
    nativeStorage: NativeStorage;
    loadingCtrl: LoadingController;
    user: any;
    userImpresions: any;
    userFllowersCount: any;
    userProfile_views: any;
    userWebsite_clicks: any;
    userReady: boolean;
    mediumWebsite_clicks: any;
    mediumImpresions: any;
    mediumFllowersCount: any;
    mediumProfile_views: any;
    colorRed: any;
    FB_APP_ID: number;
    slides: Slides;
    goToSlide(): void;
    constructor(navCtrl: NavController, fb: Facebook, nativeStorage: NativeStorage, loadingCtrl: LoadingController);
    ionViewDidEnter(): void;
    doFbLogout(): void;
}
