import { Injectable } from '@angular/core';
import{Stocks} from '../Models/stocks';

@Injectable()
export class StocksService
{
  StocksList:Stocks[]=[];
  
  constructor()
  {
    this.StocksList=
    [
      new Stocks("Infosys","Infosys",991),
      new Stocks("Tata Consultancy Services","TCS",3058),
      new Stocks("Reliance Industries","RIL",1465),
      new Stocks("Punjab National Bank","PNB",99),
      new Stocks("State Bank of India","SBI",254)
    ]
  }
  Search(name)
  {
    return this.StocksList.filter(a=>(a.Name.toLowerCase().search(name.toLowerCase())!=-1));
  }
}
