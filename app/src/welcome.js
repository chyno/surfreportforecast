import {inject} from 'aurelia-framework';
import {HttpClient} from "aurelia-fetch-client";

@inject(HttpClient)
export class Welcome {

    constructor(httpClient) {
        this.httpClient = httpClient;
        this.zip = '22207';

        this.heading = 'Current Forecast';
        this.currently;
        this.forecasts;
    }

    activate() {
        ///api/forecast     
        return this.httpClient.fetch("api/zip/" + this.zip)
            .then(response => response.json())
            .then(data => {
                this.currently = data.currently;
                this.forecasts = data.daily.data;
            });

    }

    showReadings() {
        return this.httpClient.fetch("api/zip/" + this.zip)
            .then(response => response.json())
            .then(data => {
                this.currently = data.currently;
                this.forecasts = data.daily.data;
            });


    }
}