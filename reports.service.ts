import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import {map} from "rxjs/operators"
import { Sales } from "./sales.interface";
import { environment } from "./../environments/environment";
import { transition } from "@angular/animations";

@Injectable({
  providedIn: "root",
})
export class ReportsService {
  private baseURL = environment.baseURL;

  constructor(private http: HttpClient) {}

  getSalesData(): Observable<Sales[]> {
    // GET call to fetchAllPersonTransactions
    return this.http.get<Sales[]>(`${this.baseURL}/fetchAllPersonTransactions`);
    

  }

  calculateTotalSales(): Observable<number> {
    // GET call to calculateTotalSales
    return this.http.get<number>(`${this.baseURL}/calculateTotalSales`);
      
  }

  calculateTotalCashSale(): Observable<number> {
    // GET call to calculateTotalCashSales
    return this.http.get<number>(`${this.baseURL}/calculateTotalCashSales`);
  }

  calculateTotalCreditSale(): Observable<number> {
    // GET call to calculateTotalCreditCardSales
    return this.http.get<number>(`${this.baseURL}/calculateTotalCreditSale`);
  }

  calculateBuyerWithMostSale(): Observable<{personName: string; totalSales: number;}> {
    // GET call to fetchPersonWithMostSales
    return this.http.get<{personName:string;totalSales:number}>(`${this.baseURL}/fetchPersonWithMostSales`);
  }

  addTransaction(sale: Sales): Observable<Sales> {
    // POST request to addOrUpdate endpoint. Make sure to pass sale data to create a new record in the dastabase
    return this.http.post<Sales>(`${this.baseURL}/addOrUpdate`,sale);
  }
}
