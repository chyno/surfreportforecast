import {Welcome} from '../../src/welcome';

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
    it('sets fetch response to forecast', (done) => {
        var http = new HttpStub();
        expect(http).toBeDefined();
       var sut = new Welcome(http);
        expect(sut).toBeDefined();


        var forecastStubs = [1];
        var forecastFake = [2];

        http.forecastStub = forecastStubs;
        

        sut.activate().then(() => {
            expect(sut.forecast).toBe(forecastStubs);
            expect(sut.forecast).not.toBe(forecastFake);
            done();
        });
    
    // var res = sut.activate();
    // expect(res).toBeDefined();
        // expect(sut).toBeDefined();
        //expect(1).toBe(1);
             
    });
});