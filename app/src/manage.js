import {inject} from 'aurelia-framework';
import {HttpClient} from "aurelia-fetch-client";

@inject(HttpClient)
export class Manage {

    constructor(httpClient) {
        this.userName = 'Chyno';
        this.locations  = [];
        this.availableLocations = [];
    }

    activate() {
         this.locations = [
           {city: "Arlington",
            state: "VA", 
            zip: "22207"},
            
            {city: "Wilmington",
            state: "DE", 
            zip: "19806"}  
         ];
    }
    
    getAvailableLocations() {
        //renderPossibleLocations   
    }
}