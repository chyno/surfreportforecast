import {inject} from 'aurelia-framework';
import {HttpClient} from "aurelia-fetch-client";


@inject(HttpClient)
export class LocationList {

    constructor(httpClient) {
        this.httpClient = httpClient;
        this.location = null;
    }

  activate(location) {
      this.location = location;

  }

  delete(){
    
  }

  
}