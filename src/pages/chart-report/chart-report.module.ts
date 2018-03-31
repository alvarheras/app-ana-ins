import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChartReportPage } from './chart-report';

@NgModule({
  declarations: [
    ChartReportPage,
  ],
  imports: [
    IonicPageModule.forChild(ChartReportPage),
  ],
  exports: [
    ChartReportPage
  ]
})
export class ChartReportPageModule {}
