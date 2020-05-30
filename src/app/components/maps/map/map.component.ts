import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet-routing-machine';
import { MarkerService } from 'src/app/services/marker.service';
import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  latitude = 23.825515115835344;
  longitude = 90.37126734852791;
  zomeLevel = 7;
  streetMaps: any;
  wMaps: any;
  summit: any;
  paradise: any;
  route: any;


  private map;

  constructor(private markerService: MarkerService) {
  }

  ngAfterViewInit(): void {
    // this.initMap();
    this.initMap2();
    // this.markerService.makeCapitalMarkers(this.map);
  }

  /*
  private initMap(): void {
    this.map = L.map('map', {
      center: [this.latitude, this.longitude],
      zoom: this.zomeLevel
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }
*/
  private initMap2(): void {
    this.map = L.map('map', {
      center: [this.latitude, this.longitude],
      zoom: this.zomeLevel
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    const wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Marker for the top of Mt. Ranier
  const summit = marker([ 23.825515115835344, 90.37126734852791 ], {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  });

  // Marker for the parking lot at the base of Mt. Ranier trails
const  paradise = marker([ 23.825515115835344, 90.37126734852791  ], {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      iconRetinaUrl: 'leaflet/marker-icon-2x.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  });

  // Path from paradise to summit - most points omitted from this example for brevity
  const route = polyline([[
     23.825515115835344, 90.37126734852791 ],
    [ 23.1988774747474, 91.37126734852791  ],
    [ 23.825515115835344, 90.37126734852791  ]]);

  // Layers control object with our two base layers and the three overlay layers
  const layersControl = {
    baseLayers: {
      'Street Maps': this.streetMaps,
      'Wikimedia Maps': this.wMaps
    },
    overlays: {
      'Mt. Rainier Summit': this.summit,
      'Mt. Rainier Paradise Start': this.paradise,
      'Mt. Rainier Climb Route': this.route
    }
  };


  // Set the initial set of displayed layers (we could also use the leafletLayers input binding for this)
  const options = {
    layers: [ this.streetMaps, this.route, this.summit, this.paradise ],
    zoom: 7,
    center: latLng([ 23.825515115835344, 90.37126734852791 ])
  };
  }

}
