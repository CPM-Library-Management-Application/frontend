export class Employee {
    public Username: string;
    public Password: string;
    public Email: string;
    public ID: any;
    public Rights: any;
    public LibraryID: number;

   constructor(Username: string, Password: string, Email: string,  ID: any, Rights: any, LibraryID: any){
       this.Username = Username;
       this.Password = Password;
       this.Email = Email;
       this.ID = ID;
       this.Rights = Rights;
       this.LibraryID = LibraryID;

   }
}