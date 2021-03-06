import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { GlobalService } from "../GlobalService/global.service";
import { TradeTable } from "../../Models/trade-table";

@Injectable()
export class TradeTableService {

	constructor(private globalService: GlobalService) { }
	
	trades: TradeTable[];
	getAllURL: string = "/api/trades";
	updationURL: string = "/api/TradeNotification";
  
	ngOnInit() { }

	getTrades() {
		return this.globalService.GetMethod(this.getAllURL);
	}

	GetTradeUpdates() {
		return this.globalService.GetMethod(this.updationURL);
	}
}
