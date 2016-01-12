import {inject} from 'aurelia-framework';
import {HttpClient} from "aurelia-fetch-client";

@inject(HttpClient)
export class Welcome {

    constructor(httpClient) {
        this.httpClient = httpClient;
        this.zip = '22207';
      //  this.speed = '';
      //  this.direction = 'SE';
      //  this.temp = '60';
       this.heading = 'Forecast';
       this.forecast = {currently : 'fooo'};
    }

    activate() {
        ///api/forecast     
        return this.httpClient.fetch("api/forecast")
        .then(response => response.json())
        .then(data => {
          this.forecast = data.currently;
         //  this.speed = current.windSpeed;
        });
    }
}