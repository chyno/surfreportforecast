var R = require('ramda');
import {Forecast} from '../fake/forecast';

describe('point free data access', () => {
   
   var data;
    
     beforeEach(() => {
       var forecast = new Forecast();
       data = forecast.getSample();
     });
     
   it('can get instance of ramda ', () => {
       //var sut = R.map((x) => {return x + 1;}, [1,2,3]);
      // var maxday = R.apply((x) => ) 
       expect(data.daily.data[0]).toBeDefined();
                  
    });
});