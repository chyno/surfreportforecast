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
     
    it('sets fetch response to forecast', (done) => {
       var sut = new Welcome(http); 
       
        sut.activate().then(() => {
            expect(sut.forecast).toBe(data.currently);
            //expect(sut.forecast).toBeDefined();
             done();
        });           
    });
    
    it('sets forecast wind speed', (done) => {
       var sut = new Welcome(http); 
       
        sut.activate().then(() => {
            expect(sut.forecast.windSpeed).toBeDefined();
            expect(sut.forecast.windBearing).toBeDefined();
            expect(sut.forecast.temperature).toBeDefined();
            
            //expect(sut.forecast).toBeDefined();
             done();
        });           
    });
    
     
});