export class Child {
  id:number;
  weight:number;
  height:number;
  gender:string;
  health_state:string;
  Date_Of_Birth:Date;
  constructor(){
      this.id=0;
      this.weight=0;
      this.height=0;
      this.gender='';
      this.Date_Of_Birth= new Date();
      this.health_state='';
  }
}
