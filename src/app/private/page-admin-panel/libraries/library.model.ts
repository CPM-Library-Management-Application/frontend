export class Library {
    public name: string;
    public x_coordinate: number;
    public y_coordinate: number;
    public library_id : number;

   constructor(name: string, x_coordinate: number, y_coordinate: number, library_id: number){
       this.name = name;
       this.x_coordinate = x_coordinate;
       this.y_coordinate = y_coordinate;
       this.library_id = library_id;
   }
}