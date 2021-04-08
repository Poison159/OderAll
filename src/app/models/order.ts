import { Meal } from "./meal";
import { Status } from "./status";

export class Order{
    constructor(id:number, meal: Meal, status: Status){
        this.Id = id;
        this.Meal = meal;
        this.Status = status;
        this.Date = new Date;
    }
    Id: any;
    Meal: Meal;
    Status: Status;
    Date: Date;
}