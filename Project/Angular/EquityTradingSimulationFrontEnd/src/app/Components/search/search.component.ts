import { Component, OnInit } from '@angular/core';
import {Stocks} from '../../Models/stocks';
import{StocksService} from '../../Services/StocksList/stocks.service';
import { BuySellService } from "../../Services/buy-sell/buy-sell.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit 
{
  StockShow:Stocks[]

  constructor(private SS:StocksService,private buysellservice:BuySellService) { 
    // this.StockShow=this.SS.StocksList;
    // console.log(this.StockShow);
    this.DemoRefresh();
  }

  DemoRefresh(){
    this.SS.GetStocks().subscribe(
      response => this.StockShow = response,
      error => console.error(error),
      () => console.log()
    );
  }

  getStocks(){
    this.SS.GetStocks().subscribe(
      response => this.StockShow = response,
      error => console.error(error),
      () => this.DemoRefresh()
    );

   // this.StockShow=this.SS.StocksList;
    console.log(this.StockShow);
  }

  Buy(s){
    this.buysellservice.GetBuyOrder(s);
  }

  ngOnInit() 
  {   
    //this.StockShow=this.SS.StocksList;
  }
  sort_stock_Name_ascending()
  {
   this.StockShow.sort((a, b) => a.Name.localeCompare(b.Name));
  }
  sort_stock_Name_descending()
  {
    this.StockShow.sort((a, b) => a.Name.localeCompare(b.Name));
    this.StockShow.reverse();
  }
  sort_CurPrice_ascending()
  {
   this.StockShow.sort(function(obj1, obj2)
   {
     return obj1.CurrentPrice-obj2.CurrentPrice;
   })
  }

  sort_CurPrice_descending()
  {
    this.StockShow.sort(function(obj1, obj2)
    {
      return obj2.CurrentPrice-obj1.CurrentPrice;
    })
  }
  Search(Name)
  {
    console.log(Name);
    this.StockShow = this.SS.Search(Name);
  }
  
}


