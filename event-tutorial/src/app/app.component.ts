import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import firebase from 'firebase';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any;
  zone: NgZone;

  constructor(platform: Platform) {
    this.zone = new NgZone({});
    firebase.initializeApp({
      apiKey: "AIzaSyBQb2-NUT-jEc54uyHXI4iutgFFZDVizpE",
      authDomain: "nomads-88f2d.firebaseapp.com",
      databaseURL: "https://nomads-88f2d.firebaseio.com",
      storageBucket: "nomads-88f2d.appspot.com",
      messagingSenderId: "1053161020726"
    });

    firebase.auth().onAuthStateChanged((user) => {
      this.zone.run( () => {
        if (!user) {
          this.rootPage = LoginPage;
        } else {
          this.rootPage = HomePage;
        }
      });
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
