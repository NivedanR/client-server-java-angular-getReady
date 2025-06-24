import { Component } from "@angular/core";
import { Observable, catchError, switchMap, throwError } from "rxjs";
import { ReportsService } from "./reports.service";
import { Sales } from "./sales.interface";
// Import Sales interface

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "reports-dashboard";

  salesData$: Observable<Sales[]>; //This should be an observable of Sales data

  totalSales$: Observable<number>;//This should be an observable of number
  totalCashSale$:Observable<number>; //This should be an observable of number
  totalCreditSale$: Observable<number>; //This should be an observable of number
  mostSalesBuyer$: Observable<{ personName: string; totalSales: number }>;

  transactions$: Observable<Sales[]>; // This will hold all transaction data
  errorMessage='';
  // Use this to store input values in the form
  transaction: Sales = {
    personName: '',
    transactionAmount: 0,
    transactionType: 'CASH',
  }

  transactionTypes = [
    {
      key: "CREDIT_CARD",
      value: "Credit",
    },
    {
      key: "CASH",
      value: "Cash",
    },
  ];

  // You will need to inject relevant services
  constructor(private reportService:ReportsService) {}

  ngOnInit() {
    // Make sure to populate dashboard reports with data on the page load
    this.fetchData();
  }

  handleSubmit(){
    // When a new transaction is submitted, call addTransaction method in reports.service with transaction data
    // Make sure to update dashboard reports and transaction list when a new transaction is added
    // User must be able to view latest data without refreshing the page/ browser
   if(!this.transaction.personName||!this.transaction.transactionAmount){
    this.errorMessage='All fields are required';
    return;
   }
   this.reportService.addTransaction(this.transaction).subscribe({
    next:()=>{
      this.errorMessage='';
      this.transaction={
        personName:'',
        transactionAmount:0,
        transactionType:'CASH',
      };
      this.fetchData();
    },
    error:()=>{
      this.errorMessage='Error submitting transaction';
      this.fetchData();
    }
   });
   
  
  };

  fetchData() {
    // Call getSalesData, calculateTotalSales, calculateTotalCashSale, calculateTotalCreditSale, calculateBuyerWithMostSale
    // All these methods are defined in reportsService
    // Make sure you assign the values to observables defined above
    this.salesData$=this.reportService.getSalesData();
    this.totalSales$=this.reportService.calculateTotalSales();
    this.totalCashSale$=this.reportService.calculateTotalCashSale();
    this.totalCreditSale$=this.reportService.calculateTotalCreditSale();
    this.mostSalesBuyer$=this.reportService.calculateBuyerWithMostSale();
  }
}
