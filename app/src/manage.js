import {inject} from 'aurelia-framework';
import {HttpClient} from "aurelia-fetch-client";
import {Service} from "./service";

/*
router.get('/api/userLocation/:id', userLocation.getUserLocations.bind(userLocation));
router.post('/api/userLocation', userLocation.addUserLocation.bind(userLocation));
router.delete('/api/userLocation/:id', userLocation.deleteUserLocation.bind(userLocation));

*/
@inject(HttpClient, Service)
export class Manage {

    constructor(httpClient, service) {
        this.httpClient = httpClient;
         this.headers = new Headers();
          this.headers.append("content-type", "application/json; charset=utf-8");
          this.service = service;
        this.userName = 'Chyno';
        this.locations  = [];
        this.selectectedLocation = null;
        this.selectectedState = null;
        this.availableLocations = [];
        this.states = [];
    }

    activate() {
        return this.getStates().then(() => {
              this.getLocations().then(lcs => {
                  this.locations = lcs;
              } );
        });
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
        var data = {
             method: 'POST',
             headers: this.headers
         };
    
       this.selectectedLocation.userName = this.userName;
        data.body = JSON.stringify(this.selectectedLocation);

        return this.httpClient.fetch("/api/userLocation",  data)
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
            .then(sellocattion => {
                this.selectectedLocation.id = sellocattion.id;
                this.locations.push(this.selectectedLocation);
                //this.selectectedLocation = null;
            });
     }

      getLocations() {
        
        return  this.service.getCurrentLocations();
    }
    
     removeLocation(event)
     {
        // alert(event);
         console.log(event);

         var data = {
             method: 'DELETE',
             headers: this.headers
         };

         return this.httpClient.fetch("/api/userLocation/" + event.id, data)
            .catch((r) => {
                alert(r);
            })
            .then(response => {
                if (response.ok) {
                    this.locations.pop(event);
                }
                else {
                     alert('error');
                }
            }
            );   
                  
     }
}

