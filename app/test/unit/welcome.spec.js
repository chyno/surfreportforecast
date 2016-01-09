import {Welcome} from '../../src/welcome';

class HttpStub {
  fetch(url) {
    var response = this.itemStub;
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
    var sut = new Welcome(http);
   var itemStubs = [1];
    var itemFake = [2];

    http.itemStub = itemStubs;
    sut.activate().then(() => {
      expect(sut.forecast).toBe(itemStubs);
      expect(sut.forecast).not.toBe(itemFake);
      done();
    });
    
   // expect(sut).toBeDefined();
    //expect(1).toBe(1);
    //done();     
  });
});
