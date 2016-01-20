import {Welcome} from '../../src/welcome';
import {Forecast} from '../fake/forecast';


class HttpStub {
    fetch(url) {
        var response = this.forecastStub;
        this.url = url;
        return new Promise((resolve) => {
            resolve({ json: () => response });
        });
    }
    configure(func) {
    }
}

describe('the Welcome module', () => {
    var data, forecast, http;
    
     beforeEach(() => {
          forecast = new Forecast();
          data = forecast.getSample();
           http = new HttpStub();
           http.forecastStub = data;
     });
     
    xit('sets fetch response to forecast', (done) => {
       var sut = new Welcome(http); 
       
        sut.activate().then(() => {
            //expect(sut.forecast).toBe(data.currently);
            expect({}).toBeDefined();
             done();
        });           
    });
    
    xit('sets forecast wind speed', (done) => {
       var sut = new Welcome(http); 
       
        sut.activate().then(() => {
            expect(sut.currently.windSpeed).toBeDefined();
            expect(sut.currently.windBearing).toBeDefined();
            expect(sut.currently.temperature).toBeDefined();
            
            //expect(sut.forecast).toBeDefined();
             done();
        });           
    });
    
     
});