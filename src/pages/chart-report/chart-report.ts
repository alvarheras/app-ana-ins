import { Component } from '@angular/core';
import { NavController,LoadingController,Slides,NavParams } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { UserPage } from '../user/user';

/**
 * Generated class for the ChartReportPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-chart-report',
  templateUrl: 'chart-report.html',
})
export class ChartReportPage {

  arrayApintar: any;
  userReady: boolean = false;
  nameTitle: boolean = false;
  colorRed: any;
  difference15Days: any; 
  objectDiferrence15Days: any;
  hasData30Days: boolean = false;
  totalLeftSide: any; 
  totalRightSide: any; 
  
  public lineChartData:Array<any> = [];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true,
    scales: {
      xAxes: [{
                  gridLines: {
                      display:false
                  }
              }],
      yAxes: [{
                  gridLines: {
                      display:false
                  }   
              }]
    }
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'rgba(0,0,0,0.4)',
      pointBackgroundColor: 'rgba(0,0,0,0.3)',
      pointBorderColor: 'rgba(0,0,0,0.8)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.5)'
    }
  ];
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }


  constructor(
    public navCtrl: NavController,
    public fb: Facebook,
    public nativeStorage: NativeStorage,
    public loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {
    // get params of nav
    this.arrayApintar = navParams.get("arrayApintar");
    this.nameTitle = navParams.get("name");
    //alert(JSON.stringify(this.arrayApintar));
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad ChartReportPage');
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });

    loader.present();


    //RVERSERVERSERVERSERVERSE
    this.arrayApintar = this.arrayApintar.reverse();

    let arr: any[];
    arr = [];
    var longitud2 = this.arrayApintar.length;

    for(var t = 0; t < this.arrayApintar.length; t++){
      arr.push(this.arrayApintar[t].value);
      this.lineChartLabels.push(" ");
    }

    // RVERSERVERSERVERSERVERSE
    this.arrayApintar = this.arrayApintar.reverse();

    // partimos array para comparaciones
    //var half_length = Math.ceil(this.arrayApintar.length / 2);    
    //var leftSide = this.arrayApintar.splice(0,half_length);
    //var rightSide = this.arrayApintar.splice(half_length);
    //alert(leftSide.length);
    //alert(rightSide.length);
    if(this.arrayApintar.length > 29) {

      this.hasData30Days = true;

      var gg = 0;
      var gg2 = 0;
      for(var t = 0; t < 15; t++) {
        gg += this.arrayApintar[t].value;
      }
      for(var t = 15; t < 30; t++) {
        gg2 += this.arrayApintar[t].value;
      }

      this.totalLeftSide = gg;
      this.totalRightSide = gg2;
      this.difference15Days = gg-gg2;
      //alert(this.difference15Days);

    } else {

    }

    this.lineChartData = [
      {data: arr, label: 'Impressions'}
    ];

    setTimeout(() => {
      loader.dismiss();
      this.userReady = true;
    }, 2000);

  }



}
