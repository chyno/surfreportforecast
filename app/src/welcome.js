import {inject} from 'aurelia-framework';
import {HttpClient} from "aurelia-fetch-client";
import {Service} from "./service";

@inject(HttpClient, Service)
export class Welcome {

    constructor(httpClient, service) {
        this.service = service;
        this.httpClient = httpClient;
        this.heading = 'Current Forecast';
        this.currently;
        this.forecasts;
        this.locations  = [];
        this.selectedLocation = null;
        this.selectedLocationFromDD = null
    }

    activate() {
        return this.service.getCurrentLocations().then(lcs =>
        {
           this.locations = lcs;
           if (this.locations)
           {
               this.selectedLocation =  this.locations[0];
               this.selectedLocationFromDD = this.selectedLocation;
               return this.renderForcast();
           }
        });
    }

   renderForcast() {
     
     if (!this.selectedLocationFromDD)
        {return;}
         
    this.selectedLocation = this.selectedLocationFromDD;

        return this.httpClient.fetch("api/zip/" + this.selectedLocation.zip)
        .then(response => 
         {
            if (response.ok) {
                return response.json()
            }
            else {
                return {};
            }
         })
        .then(data => {
           this.currently = data.currently;
           this.forecasts = data.forecast;
           return "sucess";
        }).catch((r) => {
              alert(r);
        });
    }
}