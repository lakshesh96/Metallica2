import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { TradeTable } from '../../Models/trade-table';
import { Commodity } from '../../Models/commodity';
import { Location } from '../../Models/location';
import { Counterparty } from '../../Models/counterparty';


@Component({
  selector: 'app-add-trade',
  templateUrl: './add-trade.component.html',
  styleUrls: ['./add-trade.component.css']
})
export class AddTradeComponent {
  TradeForm : FormGroup;
  CommodityList: Commodity[];
  LocationList: Location[];
  CounterpartyList: Counterparty[];

  constructor() { }
      

  ngOnInit() {

      this.TradeForm = new FormGroup({
      Date: new FormControl(),
      CommodityId:new FormControl('', [Validators.required]),
      Side:new FormControl(),
      CounterPartyId:new FormControl('', [Validators.required]),
      Price:new FormControl(),
      Quantity:new FormControl('', [Validators.required]),
      LocationId:new FormControl('', [Validators.required])
    });
  }

  onSubmit({ value, valid }: { value: TradeTable, valid: boolean }) {
    console.log(value, valid);
   
  }

<<<<<<< HEAD
  // Add(date, commodity, side, counterparty, price, quantity, location){
  //   var p = { TradeDate: date, Commodity: commodity, Side: side, Counterparty: counterparty, Price: price, Quantity: quantity, Location: location }
  //   this.DS.insert(p);
  // }
=======
>>>>>>> f66df9ecb5a149066554bd8e17045b821f6f8660
}