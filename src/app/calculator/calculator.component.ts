import { Component, OnInit } from '@angular/core';
import { Currency } from '../models/currencies.model';
import { ExchangerateService } from '../exchangerate.service';
import { Exchangerate } from '../models/exhangerate';
import { SmartrateService } from '../smartrate.service';
import { Smartrate } from '../models/smartrate';
import { DecimalPipe } from '@angular/common';
import { promise } from 'protractor';

import { timer, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  rates: Exchangerate[];
  rate: Exchangerate;
  smartRates: SmartrateService[];
  sRate: Smartrate;
  currencies: Currency[];
  InputCurr: string;
  OutCurr: string;
  selected: string;
  InputAmount: number;
  UsdSmartRatio: number;
  result: number;
  explanation: boolean;


  constructor(private exchangerateService: ExchangerateService , private smartService: SmartrateService) { }

  ngOnInit() {

   this.currencies = [
      {id: 1, name: 'Select' },
      {id: 2, name: 'GBP' },
      {id: 3, name: 'BTC' },
      {id: 4, name: 'USD' },
      {id: 5, name: 'EUR' },
      {id: 6, name: 'SMART' },
      {id: 7, name: 'ETH' },
      {id: 8, name: 'ZEC' },
      {id: 8, name: 'LTC' },
    ];


    this.InputCurr = 'Select';
    this.OutCurr = 'Select';
    this.InputAmount = 1;

    this.explanation = false;

    /* const source = timer(0, 5000);
    // switch to new inner observable when source emits, emit items that are emitted
    const example = source.pipe(switchMap(() => interval(1000)));
    // output: 0,1,2,3,4,5,6,7,8,9...0,1,2,3,4,5,6,7,8
    const subscribe = example.subscribe(val => console.log(val)); */

  }

  onCurrecyChanged(val: any) {
    this.Inquiry(val);
  }

  Inquiry(val: any) {

    // API calls

    // Rates for SMART, calculated via Price_usd. Because the only common currency rate is this in two services
if (val === 'SMART') {

  // TODO these two service call must wait each other. Promise structure will add.

  this.smartService.getSmartRate(this.InputCurr)
  .subscribe(res2 => {
    this.smartRates = res2;
  });

    this.exchangerateService.getRates('USD')
      .subscribe (res => {
    this.rates = res;
    });

        this.UsdSmartRatio = 1 / this.smartRates['price_usd'];

        this.rates['id'] = this.smartRates['id'];
        this.rates['price_usd'] = this.smartRates['price_usd'];
        this.rates['price_btc'] = this.UsdSmartRatio * this.rates['price_btc'] ;
        this.rates['price_eth'] = this.UsdSmartRatio * this.rates['price_eth'] ;
        this.rates['price_ltc'] = this.UsdSmartRatio * this.rates['price_ltc'] ;
        this.rates['price_zec'] = this.UsdSmartRatio * this.rates['price_zec'] ;
        this.rates['price_eur'] = this.UsdSmartRatio * this.rates['price_eur'] ;
        this.rates['price_gbp'] = this.UsdSmartRatio * this.rates['price_gbp'] ;

  } else {

    this.exchangerateService.getRates(this.InputCurr)
        .subscribe(res2 => {
       this.rates = res2;
});

  }
     this.selected = 'Y' ;
  }

  outAmount() {

    if (this.selected === 'Y' ) {

      this.result = this.InputAmount * this.rates[ 'price_' + this.OutCurr.toLowerCase()];
      if (this.result > 0) {this.explanation = true; }
    return this.result;

  }
}


}
