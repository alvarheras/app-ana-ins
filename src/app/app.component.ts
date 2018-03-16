import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { SplashScreen} from "@ionic-native/splash-screen";
import { StatusBar} from "@ionic-native/status-bar";
import { LoginPage } from '../pages/login/login';
import { UserPage } from '../pages/user/user';

// aqui en tempplate se puede crear un template aparte de html y agregar ahi
// aqui podemos especificarle un html nuevo
// el ion nav es el que se encarga de mostrar la pagina
// podemos asignarle un selector para posteriormente poder agregar estilos
// img src ="/assests/images/conver.jpg" alt=""
// comillas diferentes en el propio template
@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})

export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  constructor(
    platform: Platform,
    public nativeStorage: NativeStorage,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar
  ) {

    platform.ready().then(() => {

      // Here we will check if the user is already logged in
      // because we don't want to ask users to log in each time they open the app
      let env = this;
      this.nativeStorage.getItem('user')
      .then( function (data) {
        //si puede obtener la información de local de el objecto usuario que ha creado anres continua a 
        env.nav.push(UserPage);
        env.splashScreen.hide();
      }, function (error) {
        // si no puede obtener lo datos lo manda al login y cierra la ventana 
        env.nav.push(LoginPage);
        env.splashScreen.hide();
      });

      this.statusBar.styleDefault(); // carga los estilos por defecto del theme
    });

    // aqui se podria crear funciones para por ejemplo en el enrutamiento creamos una funcion para poder usarla en toda la aplicación


  }

}
