import {inject} from 'aurelia-framework';
import {HttpClient} from "aurelia-fetch-client";

@inject(HttpClient)
export class Welcome {

    constructor(httpClient) {
        this.httpClient = httpClient;
        this.zip = "22207";
        this.heading = 'Current Forecast';
        this.currently;
        this.forecasts;
        this.city;
        this.state;
    }

    activate() {
        return this.reenderReults();
    }

    showReadings() {
        this.reenderReults();
    }

    reenderReults(httpClient) {
     
     if (!this.zip)
        {return;}
         
        return this.httpClient.fetch("api/zip/" + this.zip)
            .catch((r) => {
              alert(r);
        }  )
            .then(response => 
            {
                if(response.ok)
                {
                 return  response.json()
                }
                else{
                    return {};
                }
            }
            )
            .then(data => {
                this.city = data.city;
                this.state = data.state;
                this.currently = data.currently;
                this.forecasts = data.forecast;
            });
            
    }
}