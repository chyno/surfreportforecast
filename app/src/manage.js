import {inject} from 'aurelia-framework';
import {HttpClient} from "aurelia-fetch-client";

/*
router.get('/api/userLocation/:id', userLocation.getUserLocations.bind(userLocation));
router.post('/api/userLocation', userLocation.addUserLocation.bind(userLocation));
router.delete('/api/userLocation/:id', userLocation.deleteUserLocation.bind(userLocation));

*/
@inject(HttpClient)
export class Manage {

    constructor(httpClient) {
        this.userName = 'Chyno';
        this.locations  = [];
        this.selectectedLocaltion;
        this.availableLocations = [];
    }

    activate() {
        this    .getAvailableLocations();   
    }
    
    getAvailableLocations() {
        this.locations = [
           {
               id: 1,
            city: "Arlington",
            state: "VA", 
            zip: "22207"},
            
            {
                id:2,
             city: "Wilmington",
            state: "DE", 
            zip: "19806"}  
         ];
    }
    
    addLocation()
    {
        ///api/userLocation
        /*
        this.http.fetch('users', {
            method: 'post',
            body: json(user)
        }); */
        this.locations.push({city: "Honolulu",
            state: "HI", 
            zip: "999803"});

    }
    
     removeLocation(id)
     {
         alert(id);
         //this.locations = this.locations.filter(loc => loc.id != id);
     }

}

