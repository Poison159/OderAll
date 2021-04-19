import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Meal } from '../models/meal';
import { Order } from '../models/Order';
import { Status } from '../models/status';
import * as signalR from "@microsoft/signalr"; 
import { AppUser } from '../models/appUser';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public Displaymeals = new  Array<Meal>();
  public MealsCSV : string;
  public returnedOrder: Order;
  public connectionId: any;
  public date: any;
  public user : AppUser;
  public MyOrder : Order;
  public hubConnection: signalR.HubConnection
  private hubUrl = "https://localhost:44378"
  readonly POST_URL = "https://localhost:44378/api/order/send"

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    

    this.startConnection();
    this.hubConnection.on("ReceiveMessage", (res : Order) => {
      this.returnedOrder = res;
      this.user.prevOrders.push(res);
      this.date = new Date();
    });
    
    this.getMeals();
  }

  public broadcastMessage(order: Order) {
    this.http.post(this.POST_URL, order).subscribe(data => console.log(data));
    // this.connection.invoke("SendMessage1", msgDto.user, msgDto.msgText).catch(err => console.error(err));    // This can invoke the server method named as "SendMethod1" directly.
  }

  private sendOrder = (order: Order) => {
    const headers = { 'content-type': 'application/json'} 
    this.http.post('https://localhost:44378/api/order/send',JSON.stringify(order),{headers})
      .subscribe(res => {
        console.log(res);
      });
  }

  private getMeals(){
    this.http.get('https://localhost:44378/api/Meals/')
      .subscribe((res:Meal[]) => {
        this.Displaymeals = res;
      });
  }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl(this.hubUrl + '/other')
                            .build();
    this.hubConnection
      .start().then(() => {
        this.hubConnection.invoke('GetConnectionId')
          .then((connectionId) => {
             this.connectionId = connectionId;
            console.log('Connection started');
        });
      })
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public send(index:number){
    
    this.Displaymeals.forEach(element => {
      this.MealsCSV += element.id.toString() + ",";
    });
    this.MyOrder = new Order("big@sean.com",this.MealsCSV,Status.None);
    this.sendOrder(this.MyOrder);
    // this.hubConnection.invoke("MakeOrder",this.MyOrder);
  }

}
