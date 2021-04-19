import { Order } from "./Order";

export class AppUser{
    public Id: string;
    public Email : string;
    public UserName: string;
    public Password: string;
    constructor(email:string,username:string,password:string){
        this.prevOrders = new Array<Order>();
        this.Email = email;
        this.Password = password;
        this.UserName = username;
    }
     prevOrders : Array<Order>;
}