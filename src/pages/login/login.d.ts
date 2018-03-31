import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { NavController } from 'ionic-angular';
export declare class LoginPage {
    navCtrl: NavController;
    fb: Facebook;
    nativeStorage: NativeStorage;
    FB_APP_ID: number;
    constructor(navCtrl: NavController, fb: Facebook, nativeStorage: NativeStorage);
    ionViewCanEnter(): void;
    doFbLogin(): void;
}
