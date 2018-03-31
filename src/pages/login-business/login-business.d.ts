import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { NavController } from 'ionic-angular';
/**
 * Generated class for the LoginBusinessPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
export declare class LoginBusinessPage {
    navCtrl: NavController;
    fb: Facebook;
    nativeStorage: NativeStorage;
    pages: any[];
    pagesReady: boolean;
    userReady: boolean;
    FB_APP_ID: number;
    constructor(navCtrl: NavController, fb: Facebook, nativeStorage: NativeStorage);
    ionViewDidLoad(): void;
    loginWithThisPage(page: any): void;
    doFbLoginBusinnes(): void;
}
