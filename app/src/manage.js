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
        this.httpClient = httpClient;
        this.userName = 'Chyno';
        this.locations  = [];
        this.selectectedLocation = null;
        this.selectectedState = null;
        this.availableLocations = [];
        this.states = [];
    }

    activate() {
        return this.getStates()
    }
    
    getStates() {
        return this.httpClient.fetch("/api/states")
            .catch((r) => {
                alert(r);
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    return {};
                }
            }
            )
            .then(states => {
                this.states =  Object.keys(states);
                this.selectectedState = null;

            });
    }
    
    selectState() {
          var self = this;
         return this.httpClient.fetch("/api/stateZips/" + this.selectectedState)
            .catch((r) => {
                alert(r);
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    return {};
                }
            }
            )
            .then(locations => {
                self.availableLocations = locations;
            });
    }
    
    addLocation()
    {
        this.locations.push(this.selectectedLocation);
        this.selectectedLocation = null;
        
     }
    
     removeLocation(item)
     {
          this.locations.pop(item);
     }

}

