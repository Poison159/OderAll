import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Meal } from '../models/meal';
import { Order } from '../models/Order';
import { Status } from '../models/status';
import * as signalR from "@microsoft/signalr"; 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public meal : any;
  public messArr = new Array<any>();
  public connectionId: any;
  public date: any;
  public hubConnection: signalR.HubConnection
  private hubUrl = "https://chatmvc.conveyor.cloud"

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    let url = "https://www.mcdonalds.co.za/media/products/mcfeast-meal/McFeast-Burger-Large-Meal-copy.png";
    this.startConnection();
    this.hubConnection.on("ReceiveMessage", (res) => {
      this.messArr.push(res);
      this.date = new Date();
    });
    this.meal = new Meal(1,"McFeast","Very expensive",123.23,url);
    
  }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl(this.hubUrl + '/order')
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

  public send(){
    let order = new Order(1,this.meal,Status.None);
    this.hubConnection.invoke("SendMessage",order,this.connectionId);
  }

}
