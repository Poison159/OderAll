export class Meal {

    constructor(id: number,name: string, discription: string,price: number,imgPath){
        this.Id = id;
        this.Name = name;
        this.Discription = discription;
        this.Price = price;
        this.ImgPath = imgPath;
    }

    Id: number;
    Name: string;
    Discription: string;
    Price: number;
    ImgPath: string;
}