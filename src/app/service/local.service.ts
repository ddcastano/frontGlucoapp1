import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  public localSaveUser(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  public localGetUser(key: string) {
    return sessionStorage.getItem(key);
  }

  public localRemoveUser(key: string) {
    sessionStorage.removeItem(key);
  }

  public localClearUser() {
    sessionStorage.clear();
  }
}
