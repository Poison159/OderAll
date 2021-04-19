import { AppUser } from "./appUser";
import { Meal } from "./meal";
import { Status } from "./status";

export class Order{
    constructor(email:string, csv: string, status: Status){
        this.MealsCSV = csv;
        this.Status = status;
        this.Date = new Date;
        this.Email = email;
    }
    Meals: Array<Meal>;
    Status: Status;
    Email : string;
    MealsCSV : string;
    Date: Date;
}