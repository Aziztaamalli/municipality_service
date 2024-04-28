export class Child {
    id:number;
    name:string;
    LastN:string;
    gender:string;
    Birth:Date;
    Father:string;
    Mother:string;

    constructor(){
        this.id=0;
        this.name='';
        this.LastN='';
        this.gender='';
        this.Birth= new Date();
        this.Father='';
        this.Mother='';
    }
}
