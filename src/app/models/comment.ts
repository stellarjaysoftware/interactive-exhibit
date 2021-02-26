export class Comment {
  constructor(
    public id?: string,
    public text?: string,
    public name?: string,
    public userId?: number,
    public hidden: boolean = false) {
  }
}
