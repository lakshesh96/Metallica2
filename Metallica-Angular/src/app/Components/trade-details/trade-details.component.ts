import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TradeTable } from '../../Models/trade-table';
import { GlobalService } from '../../Services/GlobalService/global.service';
import { Commodity } from '../../Models/commodity';
import { Location } from '../../Models/location';
import { Counterparty } from '../../Models/counterparty';

@Component({
  selector: 'app-trade-details',
  templateUrl: './trade-details.component.html',
  styleUrls: ['./trade-details.component.css']
})
export class TradeDetailsComponent implements OnInit {

	@Input() trade: any;

	tradeForm: FormGroup;
	commodities: any = [];
	locations: any = [];
	counterParties: any = [];

	details: boolean = false;

  	constructor(public globalService: GlobalService) { 
		this.commodities = globalService.getReferenceData("Commodities");
		this.counterParties = globalService.getReferenceData("CounterParties");
		this.locations = globalService.getReferenceData("Locations");

		this.tradeForm = new FormGroup({
			'Date': new FormControl(),
			'Commodity': new FormControl('', [Validators.required]),
			'Side': new FormControl(),
			'CounterParty': new FormControl('', [Validators.required]),
			'Price': new FormControl(''),
			'Quantity': new FormControl('', [Validators.required]),
			'Location': new FormControl('', [Validators.required]),
			'UserId': new FormControl('',[Validators.required]),
			'Status': new FormControl('',[Validators.required])
		});

		this.tradeForm.get('Date').disable();
		this.tradeForm.get('Commodity').disable();
		this.tradeForm.get('Side').disable();
		this.tradeForm.get('CounterParty').disable();
		this.tradeForm.get('Price').disable();
		this.tradeForm.get('Quantity').disable();
		this.tradeForm.get('Location').disable();
		this.tradeForm.get('UserId').disable();
		this.tradeForm.get('Status').disable();
	}

	ngOnInit() { 
		this.trade.Commodity = this.commodities.find(x => x.Id === "18c70d50-0f4d-e811-b2c3-94c69105a31f");
		console.log(this.trade);
	}

	onEditClick() {
		this.details = false;
		this.tradeForm.get('Date').enable();
		this.tradeForm.get('Commodity').enable();
		this.tradeForm.get('Side').enable();
		this.tradeForm.get('CounterParty').enable();
		this.tradeForm.get('Price').enable();
		this.tradeForm.get('Quantity').enable();
		this.tradeForm.get('Location').enable();
		this.tradeForm.get('UserId').enable();
		this.tradeForm.get('Status').enable();
	}

	onSubmit(trade) {
		trade["Status"] = this.trade.Status;
		trade["UserId"] = this.trade.UserId;
		console.log(trade);
	}

}
