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

xdescribe('the Welcome module', () => {
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
            expect(sut.currently).toBe(data.currently);
          
             done();
        });           
    });
    
    it('get the current conditions', (done) => {
       var sut = new Welcome(http); 
       
        sut.activate().then(() => {
            expect(sut.currently.windSpeed).toBeDefined();
            expect(sut.currently.windBearing).toBeDefined();
            expect(sut.currently.temperature).toBeDefined();
            
            //expect(sut.forecast).toBeDefined();
             done();
        });           
    });
    
    it('get the forcast', (done) => {
       var sut = new Welcome(http); 
       
        sut.activate().then(() => {
           // expect(sut.currently.windSpeed).toBeDefined();
           // expect(sut.currently.windBearing).toBeDefined();
           // expect(sut.currently.temperature).toBeDefined();
            
            expect(sut.forecasts).toBeDefined();
             expect(sut.forecasts).toBe(data.daily.data);
             done();
        });           
    });
    
     
});