export class App {
  configureRouter(config, router) {
    config.title = 'Surf Report';
    config.map([
      { route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome',  nav: true, title: 'Reading' },
      { route: ['manage'], name: 'manage',  moduleId: 'manage', nav: true, title: 'Manage Locations' }
      
    ]);
    this.router = router;
  }
}
