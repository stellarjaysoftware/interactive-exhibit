import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  public log(message: string, isError: boolean = false): void {
    if (isError) {
      console.error('~~~~ Interactive Exhibit: ', message);
    } else {
      console.log('~~~~ Interactive Exhibit: ', message);
    }
  }
}
