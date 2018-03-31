var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { LoginPage } from '../pages/login/login';
// aqui en tempplate se puede crear un template aparte de html y agregar ahi
// aqui podemos especificarle un html nuevo
// el ion nav es el que se encarga de mostrar la pagina
// podemos asignarle un selector para posteriormente poder agregar estilos
// img src ="/assests/images/conver.jpg" alt=""
// comillas diferentes en el propio template
var MyApp = /** @class */ (function () {
    function MyApp(platform, nativeStorage, splashScreen, statusBar) {
        var _this = this;
        this.nativeStorage = nativeStorage;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        platform.ready().then(function () {
            // Here we will check if the user is already logged in
            // because we don't want to ask users to log in each time they open the app
            var env = _this;
            _this.nativeStorage.getItem('user')
                .then(function (data) {
                //si puede obtener la información de local de el objecto usuario que ha creado anres continua a 
                env.nav.push(LoginPage);
                env.splashScreen.hide();
            }, function (error) {
                // si no puede obtener lo datos lo manda al login y cierra la ventana 
                env.nav.push(LoginPage);
                env.splashScreen.hide();
            });
            _this.statusBar.styleDefault(); // carga los estilos por defecto del theme
        });
        // aqui se podria crear funciones para por ejemplo en el enrutamiento creamos una funcion para poder usarla en toda la aplicación
    }
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            template: "<ion-nav [root]=\"rootPage\"></ion-nav>"
        }),
        __metadata("design:paramtypes", [Platform,
            NativeStorage,
            SplashScreen,
            StatusBar])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map