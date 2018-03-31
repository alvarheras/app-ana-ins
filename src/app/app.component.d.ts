import { Platform, Nav } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
export declare class MyApp {
    nativeStorage: NativeStorage;
    splashScreen: SplashScreen;
    statusBar: StatusBar;
    nav: Nav;
    rootPage: any;
    constructor(platform: Platform, nativeStorage: NativeStorage, splashScreen: SplashScreen, statusBar: StatusBar);
}
