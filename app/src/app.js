export class App {
  configureRouter(config, router) {
    config.title = 'Surf Report';
    config.map([
      { route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome',  nav: true, title: 'Reading' },
      { route: ['login'], name: 'login',  moduleId: 'login', nav: true, title: 'Login' }
      
    ]);

    this.router = router;
  }
}
