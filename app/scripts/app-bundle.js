define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.title = 'Surf Report';
      config.map([{ route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome', nav: true, title: 'Reading' }, { route: ['manage'], name: 'manage', moduleId: 'manage', nav: true, title: 'Manage Locations' }]);
      this.router = router;
    };

    return App;
  }();
});
define('blur-image',["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.BlurImageCustomAttribute = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var BlurImageCustomAttribute = exports.BlurImageCustomAttribute = (_dec = (0, _aureliaFramework.inject)(Element), _dec(_class = function () {
		function BlurImageCustomAttribute(element) {
			_classCallCheck(this, BlurImageCustomAttribute);

			this.element = element;
		}

		BlurImageCustomAttribute.prototype.valueChanged = function valueChanged(newImage) {
			var _this = this;

			if (newImage.complete) {
				drawBlur(this.element, newImage);
			} else {
				newImage.onload = function () {
					return drawBlur(_this.element, newImage);
				};
			}
		};

		return BlurImageCustomAttribute;
	}()) || _class);


	var mul_table = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];

	var shg_table = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];

	var BLUR_RADIUS = 40;

	function stackBlurCanvasRGBA(canvas, top_x, top_y, width, height, radius) {
		if (isNaN(radius) || radius < 1) return;
		radius |= 0;

		var context = canvas.getContext("2d");
		var imageData;

		try {
			imageData = context.getImageData(top_x, top_y, width, height);
		} catch (e) {
			throw new Error("unable to access image data: " + e);
		}

		var pixels = imageData.data;

		var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum, r_out_sum, g_out_sum, b_out_sum, a_out_sum, r_in_sum, g_in_sum, b_in_sum, a_in_sum, pr, pg, pb, pa, rbs;

		var div = radius + radius + 1;
		var w4 = width << 2;
		var widthMinus1 = width - 1;
		var heightMinus1 = height - 1;
		var radiusPlus1 = radius + 1;
		var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

		var stackStart = new BlurStack();
		var stack = stackStart;
		for (i = 1; i < div; i++) {
			stack = stack.next = new BlurStack();
			if (i == radiusPlus1) var stackEnd = stack;
		}
		stack.next = stackStart;
		var stackIn = null;
		var stackOut = null;

		yw = yi = 0;

		var mul_sum = mul_table[radius];
		var shg_sum = shg_table[radius];

		for (y = 0; y < height; y++) {
			r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;

			r_out_sum = radiusPlus1 * (pr = pixels[yi]);
			g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
			b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
			a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

			r_sum += sumFactor * pr;
			g_sum += sumFactor * pg;
			b_sum += sumFactor * pb;
			a_sum += sumFactor * pa;

			stack = stackStart;

			for (i = 0; i < radiusPlus1; i++) {
				stack.r = pr;
				stack.g = pg;
				stack.b = pb;
				stack.a = pa;
				stack = stack.next;
			}

			for (i = 1; i < radiusPlus1; i++) {
				p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
				r_sum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
				g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
				b_sum += (stack.b = pb = pixels[p + 2]) * rbs;
				a_sum += (stack.a = pa = pixels[p + 3]) * rbs;

				r_in_sum += pr;
				g_in_sum += pg;
				b_in_sum += pb;
				a_in_sum += pa;

				stack = stack.next;
			}

			stackIn = stackStart;
			stackOut = stackEnd;
			for (x = 0; x < width; x++) {
				pixels[yi + 3] = pa = a_sum * mul_sum >> shg_sum;
				if (pa != 0) {
					pa = 255 / pa;
					pixels[yi] = (r_sum * mul_sum >> shg_sum) * pa;
					pixels[yi + 1] = (g_sum * mul_sum >> shg_sum) * pa;
					pixels[yi + 2] = (b_sum * mul_sum >> shg_sum) * pa;
				} else {
					pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
				}

				r_sum -= r_out_sum;
				g_sum -= g_out_sum;
				b_sum -= b_out_sum;
				a_sum -= a_out_sum;

				r_out_sum -= stackIn.r;
				g_out_sum -= stackIn.g;
				b_out_sum -= stackIn.b;
				a_out_sum -= stackIn.a;

				p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;

				r_in_sum += stackIn.r = pixels[p];
				g_in_sum += stackIn.g = pixels[p + 1];
				b_in_sum += stackIn.b = pixels[p + 2];
				a_in_sum += stackIn.a = pixels[p + 3];

				r_sum += r_in_sum;
				g_sum += g_in_sum;
				b_sum += b_in_sum;
				a_sum += a_in_sum;

				stackIn = stackIn.next;

				r_out_sum += pr = stackOut.r;
				g_out_sum += pg = stackOut.g;
				b_out_sum += pb = stackOut.b;
				a_out_sum += pa = stackOut.a;

				r_in_sum -= pr;
				g_in_sum -= pg;
				b_in_sum -= pb;
				a_in_sum -= pa;

				stackOut = stackOut.next;

				yi += 4;
			}
			yw += width;
		}

		for (x = 0; x < width; x++) {
			g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;

			yi = x << 2;
			r_out_sum = radiusPlus1 * (pr = pixels[yi]);
			g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
			b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
			a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

			r_sum += sumFactor * pr;
			g_sum += sumFactor * pg;
			b_sum += sumFactor * pb;
			a_sum += sumFactor * pa;

			stack = stackStart;

			for (i = 0; i < radiusPlus1; i++) {
				stack.r = pr;
				stack.g = pg;
				stack.b = pb;
				stack.a = pa;
				stack = stack.next;
			}

			yp = width;

			for (i = 1; i <= radius; i++) {
				yi = yp + x << 2;

				r_sum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
				g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
				b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
				a_sum += (stack.a = pa = pixels[yi + 3]) * rbs;

				r_in_sum += pr;
				g_in_sum += pg;
				b_in_sum += pb;
				a_in_sum += pa;

				stack = stack.next;

				if (i < heightMinus1) {
					yp += width;
				}
			}

			yi = x;
			stackIn = stackStart;
			stackOut = stackEnd;
			for (y = 0; y < height; y++) {
				p = yi << 2;
				pixels[p + 3] = pa = a_sum * mul_sum >> shg_sum;
				if (pa > 0) {
					pa = 255 / pa;
					pixels[p] = (r_sum * mul_sum >> shg_sum) * pa;
					pixels[p + 1] = (g_sum * mul_sum >> shg_sum) * pa;
					pixels[p + 2] = (b_sum * mul_sum >> shg_sum) * pa;
				} else {
					pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
				}

				r_sum -= r_out_sum;
				g_sum -= g_out_sum;
				b_sum -= b_out_sum;
				a_sum -= a_out_sum;

				r_out_sum -= stackIn.r;
				g_out_sum -= stackIn.g;
				b_out_sum -= stackIn.b;
				a_out_sum -= stackIn.a;

				p = x + ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;

				r_sum += r_in_sum += stackIn.r = pixels[p];
				g_sum += g_in_sum += stackIn.g = pixels[p + 1];
				b_sum += b_in_sum += stackIn.b = pixels[p + 2];
				a_sum += a_in_sum += stackIn.a = pixels[p + 3];

				stackIn = stackIn.next;

				r_out_sum += pr = stackOut.r;
				g_out_sum += pg = stackOut.g;
				b_out_sum += pb = stackOut.b;
				a_out_sum += pa = stackOut.a;

				r_in_sum -= pr;
				g_in_sum -= pg;
				b_in_sum -= pb;
				a_in_sum -= pa;

				stackOut = stackOut.next;

				yi += width;
			}
		}

		context.putImageData(imageData, top_x, top_y);
	}

	function BlurStack() {
		this.r = 0;
		this.g = 0;
		this.b = 0;
		this.a = 0;
		this.next = null;
	}

	function drawBlur(canvas, image) {
		var w = canvas.width;
		var h = canvas.height;
		var canvasContext = canvas.getContext('2d');
		canvasContext.drawImage(image, 0, 0, w, h);
		stackBlurCanvasRGBA(canvas, 0, 0, w, h, BLUR_RADIUS);
	};
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('location-list',["exports", "aurelia-framework", "aurelia-fetch-client"], function (exports, _aureliaFramework, _aureliaFetchClient) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.LocationList = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var LocationList = exports.LocationList = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function LocationList(httpClient) {
      _classCallCheck(this, LocationList);

      this.httpClient = httpClient;
      this.location = null;
    }

    LocationList.prototype.activate = function activate(location) {
      this.location = location;
    };

    LocationList.prototype.delete = function _delete() {};

    return LocationList;
  }()) || _class);
});
define('location',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Users = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function Users(http) {
      _classCallCheck(this, Users);

      this.heading = 'Github Users';

      http.configure(function (config) {
        config.useStandardConfiguration().withBaseUrl('https://api.github.com/');
      });

      this.http = http;
    }

    Users.prototype.activate = function activate() {
      var _this = this;

      return this.http.fetch('users').then(function (response) {
        return response.json();
      }).then(function (users) {
        return _this.users = users;
      });
    };

    return Users;
  }()) || _class);
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('manage',["exports", "aurelia-framework", "aurelia-fetch-client", "./service"], function (exports, _aureliaFramework, _aureliaFetchClient, _service) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Manage = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var headers = new Headers();
    headers.append("content-type", "application/json; charset=utf-8");

    var Manage = exports.Manage = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _service.Service), _dec(_class = function () {
        function Manage(httpClient, service) {
            _classCallCheck(this, Manage);

            this.httpClient = httpClient;
            this.service = service;

            this.locations = [];
            this.selectectedLocation = null;
            this.selectectedState = null;
            this.availableLocations = [];
            this.states = [];
        }

        Manage.prototype.activate = function activate() {
            var _this = this;

            return this.getStates().then(function () {
                _this.getLocations().then(function (lcs) {
                    _this.locations = lcs;
                });
            });
        };

        Manage.prototype.getStates = function getStates() {
            var _this2 = this;

            return this.httpClient.fetch("/api/states").catch(function (r) {
                alert(r);
            }).then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    return {};
                }
            }).then(function (states) {
                _this2.states = Object.keys(states);
                _this2.selectectedState = null;
            });
        };

        Manage.prototype.selectState = function selectState() {
            var self = this;
            return this.httpClient.fetch("/api/stateZips/" + this.selectectedState).catch(function (r) {
                alert(r);
            }).then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    return {};
                }
            }).then(function (locations) {
                self.availableLocations = locations;
            });
        };

        Manage.prototype.addLocation = function addLocation() {
            var _this3 = this;

            var data = {
                method: 'POST',
                headers: this.headers
            };

            this.selectectedLocation.userName = this.service.getUserName();
            data.body = JSON.stringify(this.selectectedLocation);

            return this.httpClient.fetch("/api/userLocation", data).catch(function (r) {
                alert(r);
            }).then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    return {};
                }
            }).then(function (sellocattion) {
                _this3.selectectedLocation.id = sellocattion.id;
                _this3.locations.push(_this3.selectectedLocation);
            });
        };

        Manage.prototype.getLocations = function getLocations() {
            return this.service.getCurrentLocations();
        };

        Manage.prototype.removeLocation = function removeLocation(event) {
            var _this4 = this;

            console.log(event);

            var data = {
                method: 'DELETE',
                headers: this.headers
            };

            return this.httpClient.fetch("/api/userLocation/" + event.id, data).catch(function (r) {
                alert(r);
            }).then(function (response) {
                if (response.ok) {
                    _this4.locations.pop(event);
                } else {
                    alert('error');
                }
            });
        };

        return Manage;
    }()) || _class);
});
define('service',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Service = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Service = exports.Service = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
        function Service(httpClient) {
            _classCallCheck(this, Service);

            this.httpClient = httpClient;
            this.userName = 'Chyno';
        }

        Service.prototype.getUserName = function getUserName() {
            return 'Chyno';
        };

        Service.prototype.getCurrentLocations = function getCurrentLocations() {
            return this.httpClient.fetch("/api/userLocation/" + this.userName).catch(function (r) {
                alert(r);
            }).then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    return {};
                }
            }).then(function (locations) {
                return locations;
            });
        };

        return Service;
    }()) || _class);
});
define('welcome',["exports", "aurelia-framework", "aurelia-fetch-client", "./service"], function (exports, _aureliaFramework, _aureliaFetchClient, _service) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Welcome = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Welcome = exports.Welcome = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _service.Service), _dec(_class = function () {
        function Welcome(httpClient, service) {
            _classCallCheck(this, Welcome);

            this.service = service;
            this.httpClient = httpClient;
            this.heading = 'Current Forecast';
            this.currently;
            this.forecasts;
            this.locations = [];
            this.selectedLocation = null;
        }

        Welcome.prototype.activate = function activate() {
            var _this = this;

            return this.service.getCurrentLocations().then(function (lcs) {
                _this.locations = lcs;
                if (_this.locations) {
                    _this.selectedLocation = _this.locations[0];
                    return _this.renderForcast();
                }
            });
        };

        Welcome.prototype.renderForcast = function renderForcast() {
            var _this2 = this;

            if (!this.selectedLocation) {
                return;
            }

            return this.httpClient.fetch("api/zip/" + this.selectedLocation.zip).catch(function (r) {
                alert(r);
            }).then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    return {};
                }
            }).then(function (data) {
                _this2.currently = data.currently;
                _this2.forecasts = data.forecast;
            });
        };

        return Welcome;
    }()) || _class);
});
define('auth/authConfig',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var configForDevelopment = {
        loginUrl: '/auth/login',
        providers: {
            google: {
                clientId: '239531826023-ibk10mb9p7ull54j55a61og5lvnjrff6.apps.googleusercontent.com'
            },

            linkedin: {
                clientId: '778mif8zyqbei7'
            },
            facebook: {
                clientId: '1452782111708498'
            }
        }
    };

    var configForProduction = {
        providers: {
            google: {
                clientId: '239531826023-3ludu3934rmcra3oqscc1gid3l9o497i.apps.googleusercontent.com'
            },

            linkedin: {
                clientId: '7561959vdub4x1'
            },
            facebook: {
                clientId: '1653908914832509'
            }

        }
    };
    var config;
    if (window.location.hostname === 'localhost') {
        config = configForDevelopment;
    } else {
        config = configForProduction;
    }

    exports.default = config;
});
define('auth/login',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Login = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Login = exports.Login = function () {
        function Login() {
            _classCallCheck(this, Login);

            this.email = '';
            this.password = '';
        }

        Login.prototype.login = function login() {};

        Login.prototype.authenticate = function authenticate(name) {};

        return Login;
    }();
});
define('authentication/login',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Login = exports.Login = function Login() {
    _classCallCheck(this, Login);
  };
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"nav-bar.html\"></require>\r\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\r\n <nav-bar router.bind=\"router\"></nav-bar>\r\n  <div class=\"page-host\">\r\n    <div class=\"container\">\r\n      <div class=\"page-header\" id=\"banner\">\r\n        <div class=\"row\">\r\n           <router-view></router-view>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n"; });
define('text!location-list.html', ['module'], function(module) { module.exports = "<template>\r\n<td>${location.city}</td>\r\n<td>${location.state}</td>\r\n<td>${location.zip}</td>\r\n <td> <button click.delegate=\"removeLocation()\">Remove</button> </td>\r\n</template>"; });
define('text!location.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"blur-image\"></require>\r\n\r\n  <section class=\"au-animate\">\r\n    <h2>${heading}</h2>\r\n    <div class=\"row au-stagger\">\r\n      <div class=\"col-sm-6 col-md-3 card-container au-animate\" repeat.for=\"user of users\">\r\n        <div class=\"card\">\r\n          <canvas class=\"header-bg\" width=\"250\" height=\"70\" blur-image.bind=\"image\"></canvas>\r\n          <div class=\"avatar\">\r\n            <img src.bind=\"user.avatar_url\" crossorigin ref=\"image\"/>\r\n          </div>\r\n          <div class=\"content\">\r\n            <p class=\"name\">${user.login}</p>\r\n            <p><a target=\"_blank\" class=\"btn btn-default\" href.bind=\"user.html_url\">Contact</a></p>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </section>\r\n</template>\r\n"; });
define('text!manage.html', ['module'], function(module) { module.exports = "<template>\r\n<div class=\"spinner\">\r\n    <This is spinner/div>\r\n        <div style=\"margin:2em\">\r\n            <label class=\"control-label\" class=\"sr-only\" for=\"user\">User:</label> <span id=\"user\" class=\"label label-success\">${userName}</span>\r\n\r\n            <h3>Current Locations</h3>\r\n            <table class=\"table table-bordered\">\r\n                <thead>\r\n                    <tr>\r\n                        <th>City</th>\r\n                        <th>State</th>\r\n                        <th>Zip</th>\r\n                        <th>\r\n\r\n                        </th>\r\n                    </tr>\r\n                    <tr repeat.for=\"location of locations\" value.bind=\"selectecUserLocation\">\r\n                        <td>${location.city}</td>\r\n                        <td>${location.state}</td>\r\n                        <td>${location.zip}</td>\r\n                        <td>\r\n                            <button click.delegate=\"removeLocation(location)\">Remove</button>\r\n                        </td>\r\n                    </tr>\r\n                </thead>\r\n            </table>\r\n\r\n            <div class=\"form-horizontal\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-md-2\">\r\n                        <label class=\"sr-only\" for=\"exampleInputAmount\">States</label>\r\n                        <div class=\"input-group\">\r\n                            <div class=\"input-group-addon\">States</div>\r\n                            <select class=\"form-control\" id=\"slcStates\" value.bind=\"selectectedState\">\r\n                                <option repeat.for=\"state of states\" value.bind=\"state\">${state}</option>\r\n                        </select> </div>\r\n                    </div>\r\n                    <div  class=\"col-sm-10\">\r\n                        <button   btn btn-default click.delegate=\"selectState()\" class=\"btn btn-primary \">Select</button>\r\n                    </div>\r\n\r\n                </div>\r\n\r\n                <div class=\"form-group\" show.bind=\"selectectedLocation\">\r\n                    <div class=\"col-md-2\">\r\n                        <label class=\"sr-only\" for=\"slcLocations\">Available Locations</label>\r\n                        <select class=\"form-control\" id=\"slcLocations\" value.bind=\"selectectedLocation\">\r\n                        <optgroup repeat.for=\"location of availableLocations\" label.bind=\"location.city\"   >\r\n                             <option repeat.for=\"place of location.locations\" model.bind=\"place\">${place.city}  - ${place.zip} </option>\r\n                          </optgroup>\r\n                        </select>\r\n                    </div>\r\n                     <div  class=\"col-sm-10\">\r\n                         <button class=\"btn btn-default \" click.delegate=\"addLocation()\" class=\"btn btn-primary\">Add</button>\r\n                     </div>\r\n                    \r\n                </div>\r\n            </div>\r\n            </template>"; });
define('text!nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\r\n\r\n <div class=\"navbar navbar-default navbar-fixed-top\">\r\n      <div class=\"container\">\r\n        <div class=\"navbar-header\">\r\n          <a class=\"navbar-brand\" href=\"images/128.png\">${router.title}</a>\r\n          <button class=\"navbar-toggle\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbar-main\">\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n          </button>\r\n        </div>\r\n\r\n         <div class=\"collapse navbar-collapse\" id=\"skeleton-navigation-navbar-collapse\">\r\n            <ul class=\"nav navbar-nav\">\r\n                <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\r\n                    <a data-toggle=\"collapse\" data-target=\"#skeleton-navigation-navbar-collapse.in\" href.bind=\"row.href\">${row.title}</a>\r\n                </li>\r\n                <li>\r\n                    <img src=\"/images/surfsmall.png\" style=\"padding-left: 10px\"></img>\r\n                </li>\r\n            </ul>\r\n       \r\n\r\n          <ul class=\"nav navbar-nav navbar-right\">\r\n            <li><a href=\"#\" target=\"_blank\">Log In</a></li>\r\n            <li><a href=\"#\" target=\"_blank\">Exit</a></li>\r\n              <li class=\"loader\" if.bind=\"router.isNavigating\">\r\n                    <i class=\"fa fa-spinner fa-spin fa-2x\"></i>\r\n                </li>\r\n          </ul>\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n</template>"; });
define('text!welcome.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n<div class=\"col-lg-12\">\r\n    \r\n\r\n<div class=\"bs-component\">\r\n    \r\n     <div class=\"row\" style=\"margin-top:1.5em\">\r\n                <div class=\"col-md-4\">\r\n                     <p class=\"text-primary\">${selectedLocation.city}, ${selectedLocation.state} </p>\r\n                </div>\r\n                <div class=\"col-md-8\">\r\n                    <form class=\"form-inline\">\r\n                        <div class=\"form-group\">\r\n                            <label class=\"sr-only\" for=\"exampleInputAmount\">Available</label>\r\n                            <div class=\"input-group\">\r\n                                <div class=\"input-group-addon\">Available</div>\r\n                                <select class=\"form-control\" id=\"slcStates\" value.bind=\"selectedLocation\">\r\n                                        <option repeat.for=\"location of locations\" model.bind=\"location\" >${location.state} - ${location.zip}</option>\r\n                                </select> </div>\r\n                            <button click.delegate=\"click.trigger=renderForcast()\" class=\"btn btn-primary\">Update</button>\r\n                        </div>\r\n                 </form>\r\n                </div>\r\n               \r\n            </div>\r\n              <hr style=\"margin: 0 !imprortant\">\r\n               <h2 id=\"forcast\">Forcast</h2>\r\n            <div class=\"row\">\r\n                <div class=\"col-md-2\">\r\n                    <label for=\"sp\" class=\"control-label\">Wind Speed: </label><span class=\"label label-default\">${currently.windSpeed}</span></div>\r\n                <div class=\"col-md-2\">\r\n                    <label for=\"dr\" class=\"control-label\">Wind Bearing: </label> <span class=\"label label-default\">${currently.windBearing}</span></div>\r\n                <div>\r\n                    <label for=\"city\" class=\"control-label\">Temperature: </label><span class=\"label label-default\">${currently.temperature}</span></div>\r\n\r\n            </div>\r\n\r\n            <table class=\"table table-striped table-hover\">\r\n                <thead>\r\n                    <tr>\r\n                        <th>Date</th>\r\n                        <th>Wind Speed</th>\r\n                        <th>Wind Bearing</th>\r\n                        <th>Max Temperature</th>\r\n                        <th>Min Temperature</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <template repeat.for=\"forecast of forecasts\">\r\n                        <tr class=\"${forecast.windSpeed > 15 ? 'success' : ''}\">\r\n                            <td>${forecast.time}</td>\r\n                            <td>\r\n                                ${forecast.windSpeed}\r\n                            </td>\r\n                            <td>\r\n                                ${forecast.windBearing}\r\n                            </td>\r\n                            <td>\r\n                                ${forecast.temperatureMax}\r\n                            </td>\r\n                            <td>\r\n                                ${forecast.temperatureMin}\r\n                            </td>\r\n                        </tr>\r\n\r\n                    </template>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n</template>"; });
define('text!auth/login.html', ['module'], function(module) { module.exports = " <template>\r\n <button class=\"btn btn-block btn-google-plus\" click.delegate=\"authenticate('google')\">\r\n          <span class=\"ion-social-googleplus\"></span>Sign in with Google\r\n</button>\r\n      </template>"; });
define('text!authentication/login.html', ['module'], function(module) { module.exports = " <template>\r\n  <button class=\"btn btn-block btn-google-plus\" click.delegate=\"authenticate('google')\">\r\n  <span class=\"ion-social-googleplus\"></span>Sign in with Google\r\n  </button>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map