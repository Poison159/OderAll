export class Meal {

    constructor(id: number,name: string, discription: string,price: number,imgPath){
        this.id = id;
        this.Name = name;
        this.Discription = discription;
        this.Price = price;
        this.ImgPath = imgPath;
    }

    id: number;
    OrderId: any;
    Name: string;
    Discription: string;
    Price: number;
    ImgPath: string;
}