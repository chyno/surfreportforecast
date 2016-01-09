import {inject} from 'aurelia-framework';
import {HttpClient} from "aurelia-fetch-client";

@inject(HttpClient)
export class Welcome {

    constructor(httpClient) {
        this.httpClient = httpClient;
        this.zip = '22207';
        this.speed = '';
        this.direction = 'SE';
        this.temp = '60';
        this.heading = 'Forecast';
        this.forecast;
    }

    activate() {
        
        his.http.fetch('something')
            .then(response => response.json())
            .then(data => {
                    console.log(data);
            })
            
        ///api/forecast     
        return this.http.fetch("api/forecast").then(response => response.json())
        .then(data => {
            this.forecast = data;
        });
    }
}