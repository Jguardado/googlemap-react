'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GoogleMapComponent = function (_Component) {
  _inherits(GoogleMapComponent, _Component);

  function GoogleMapComponent() {
    _classCallCheck(this, GoogleMapComponent);

    return _possibleConstructorReturn(this, (GoogleMapComponent.__proto__ || Object.getPrototypeOf(GoogleMapComponent)).apply(this, arguments));
  }

  _createClass(GoogleMapComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var directionsDisplay = void 0;
      var directionsService = void 0;
      var infoWindow = void 0;
      var map = void 0;
      var mapID = "mapDiv" + this.props.nMap;
      var mapOptions = {
        center: {
          lat: -34.397,
          lng: 150.644
        },
        zoom: 8
      };

      map = new window.google.maps.Map(document.getElementById(mapID), mapOptions);
      directionsDisplay = new window.google.maps.DirectionsRenderer();
      directionsService = new window.google.maps.DirectionsService();
      infoWindow = new window.google.maps.InfoWindow({ map: map });

      var travelMode = this.props.travelMode || 'DRIVING';

      var request = {
        origin: this.props.origin,
        destination: this.props.destination,
        travelMode: travelMode,
        transitOptions: {
          arrivalTime: this.props.arrivalTime,
          departureTime: this.props.departureTime
        }
      };

      directionsService.route(request, function (result, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(result);
        }
      });

      directionsDisplay.setMap(map);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          map.setCenter(pos);
        }, function () {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        handleLocationError(false, infoWindow, map.getCenter());
      }

      var handleLocationError = function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        height: "50%",
        width: "50%",
        position: "absolute",
        margin: "5% 0% 5% 10%"
      };

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { style: style, id: 'mapDiv' + this.props.nMap },
          'Google Maps'
        )
      );
    }
  }]);

  return GoogleMapComponent;
}(_react.Component);
// Usage:
// <GoogleMapComponent nMap={1}/>
// nMap is used incase you need multiple maps. the component will generate a new div id by
// concatinating the value of nMap to a string; @example: "mapDiv" + 1;


exports.default = GoogleMapComponent;
