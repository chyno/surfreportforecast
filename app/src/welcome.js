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
        this.city;
        this.state;
    }

    activate() {
        return this.reenderReults(this.httpClient)
    }

    showReadings() {
        this.reenderReults(this.httpClient);
    }

    reenderReults(httpClient) {
         return httpClient.fetch("api/zip/" + this.zip)
            .then(response => response.json())
            .then(data => {
                this.city = data.city;
                this.state = data.state;
                this.currently = data.currently;
                this.forecasts = data.daily.data;
            });
    }
}