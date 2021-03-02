export class Comment {
  constructor(
    // tslint:disable-next-line:variable-name
    public _id?: string,
    public text?: string,
    public name?: string,
    public userId?: number,
    public hidden: boolean = false) {
  }
}
