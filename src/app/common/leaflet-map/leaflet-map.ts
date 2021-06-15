import * as Leaflet from 'leaflet';

const bielany = {
    coords: new Leaflet.LatLng(51.109637, 17.030841),
    zoom: 11
};

const DEFAULT_ZOOM = 15;

export class LeafletMap {
    map: Leaflet.Map;
    popup!: Leaflet.Popup;

    constructor(id: string){
        this.map = Leaflet.map(id);

        Leaflet
            .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
            .addTo(this.map);

        this.map.setView(bielany.coords, bielany.zoom);
    }

    updatePopup(lat: number, lng: number, info: string){
        const coordinates = Leaflet.latLng(lat,lng);
        console.log(coordinates);
        this.map.setView(coordinates,DEFAULT_ZOOM);
        if(this.popup){
            this.popup.setLatLng(coordinates);
            this.popup.setContent(info);
        }else {
            this.popup = Leaflet.popup({
                closeButton: false,
                closeOnEscapeKey: false,
                closeOnClick: false
            })
            .setLatLng(coordinates)
            .setContent(info)
            .openOn(this.map);
        }
    }
}