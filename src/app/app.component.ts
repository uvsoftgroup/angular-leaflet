import { Component, OnInit } from '@angular/core';
import '../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';
import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';
import { HttpClient } from '@angular/common/http';

declare let L;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  latitude = 23.825515115835344;
  longitude = 90.37126734852791;
  zomeLevel = 7;
  coordGPSSystem: any = 'EPSG:4326';
  coordOSMSystem: any = 'EPSG:3857';
  tiles: any ;
  baseurl: any;
  markers: any;
  bounds: any;
  polygon: any;
  polyline: any;
  svgLayer: any;
  rectangulerLayer: any;
  circleLayer: any[] = [];
  circle: any;

  constructor(private http: HttpClient) {
    this.baseurl = 'http://localhost:7777/geoserver/uvsoftgroupgeospatial/wms'; // geoserver_map
    console.log('--------------this.baseurl:' + this.baseurl);
  }
  // Loading based and all additional layers
  ngOnInit() {
    this.initMap(this.latitude, this.longitude, this.zomeLevel);
  }

  private initMap(latitude: number, longitude: number, zomeLevel: number) {

    const map = L.map('map').setView([latitude, longitude], zomeLevel);
   // TileLayer
   const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    // tiles.addTo(map);
    const wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let i;

    // Point Vector Layer
    for (i = 0; i <= 100; i++) {
     this.markers =  L.marker([22.825515115835344 + Math.random(), 90.37126734852791 + + Math.random()],
        {title: 'Point_' + i, alt: 'Point-' + i , draggable: true}).addTo(map);
    }


    // Polyline Vector Layer
    for (i = 0; i <= 10; i++) {
   this.polyline = L.polyline([[22.825515115835344,
                                89.37126734852791],
                                [22.825515115835344 + Math.random(),
                                 90.37126734852791 + Math.random()]
                                ], {
        color: 'green', weight: 10});
    }


    // Polygon Vector Layer
    for (i = 0; i <= 10; i++) {
   this.polygon = L.polygon([
     [23.825515115835344 + Math.random(),
      90.37126734852791 + Math.random()],
     [23.825 + Math.random(),
     90.371 + Math.random()],
     [23.82551515555 + Math.random(),
      90.37125555 + Math.random()]],
     {color: 'white', weight: 4, fillColor: 'blue', fillOpacity: .25});
     map.fitBounds(this.polygon.getBounds());
    }


  // Circle Vector Layer
  for (i = 0; i <= 10; i++) {
  this.circle = L.circle([22.825515115835344, 89.37126734852791],
            {radius: 100000 * Math.random()});
  this.circleLayer.push(this.circle + i);
  }


// Rectangle Vector Layer
  for (i = 0; i <= 10; i++) {
  // define rectangle geographical bounds
this.bounds = [
  [22.825515115835344 + Math.random(), 90.37126734852791 + Math.random()],
 [22.925515115835344 + Math.random(), 90.87126734852791 + Math.random()]];
// create an orange rectangle
this.rectangulerLayer = L.rectangle(this.bounds, {color: 'green', weight: 1});
// zoom the map to the rectangle bounds
map.fitBounds(this.bounds);
  }


   // VideoOverlay
  const videoUrl = 'http://dl5.webmfiles.org/big-buck-bunny_trailer.webm',
    videoBounds = [[23.825515115835344, 91.37126734852791], [ 24.825515115835344, 92.37126734852791]];
  const videoLayer = L.videoOverlay(videoUrl, videoBounds );

   const videoUrl2 = 'http://dl5.webmfiles.org/elephants-dream.webm',
    videoBounds2 = [[23.825515115835344, 90.37126734852791], [ 22.825515115835344, 91.37126734852791]];
   const videoLayer2 = L.videoOverlay(videoUrl2, videoBounds2 );


// SVGOverlay
for (i = 0; i <= 10; i++) {
const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
svgElement.setAttribute('viewBox', '0 0 200 200');
// tslint:disable-next-line: max-line-length
svgElement.innerHTML = '<rect width="50" height="50"/><rect x="75" y="23" width="25" height="25" style="fill:white"/><rect x="75" y="123" width="50" height="50" style="fill:#0013ff"/>';
// tslint:disable-next-line: prefer-const
const svgElementBounds = [
  [23.825515115835344 + Math.random(), 90.37126734852791 + Math.random()],
 [ 22.825515115835344 + Math.random(), 91.37126734852791 + Math.random()]];
this.svgLayer = L.svgOverlay(svgElement, svgElementBounds);
}

const allVectorLayers = L.layerGroup([this.svgLayer, this.polygon,
  this.rectangulerLayer, this.circle, this.polyline]);

// ImageOverlay
const imageUrl = 'http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
    imageBounds = [
      [23.825515115835344, 90.37126734852791],
    [ 22.825515115835344, 91.37126734852791]];
 const imageLayer = L.imageOverlay(imageUrl, imageBounds);

// TileLayer.WMS
const bdRoads = L.tileLayer.wms(this.baseurl, {
    layers: 'roads',
    format: 'image/png',
    transparent: true,
    attribution: 'Bangladesh Road Network from OSM'
});

const bdOSMBuilding = L.tileLayer.wms(this.baseurl, {
  layers: 'osm_buildings_2',
  format: 'image/png',
  transparent: true,
  attribution: 'Registred Plot Information'
});

// All based layers
const baseMaps = {
  'OSM Street': tiles,
  'OSM Grayscale': wMaps
};

// All overlay layers
const overlays = {
  'Bangladesh Road': bdRoads,
  'Bangladesh Building': bdOSMBuilding,
  'Registred Plot' : this.polygon,
  'Construction Plan' : imageLayer,
  'Construction Building Block' : this.svgLayer,
  'Construction Building Section' : this.rectangulerLayer,
  'Construction Movie Civil' : videoLayer,
  'Construction Movie Nature' : videoLayer2,
  'Enviromental Protection Area': allVectorLayers
};
/*
baseMaps: could possible to set as a null layer, if required
 Layers grouping and controlling position: topleft, topright, bottomleft, bottomright
 */
L.control.layers(baseMaps, overlays, {position: 'topright'}).addTo(map);
// Map Scalling
L.control.scale().addTo(map);

}

}
