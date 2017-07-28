import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()

export class MapService {
    constructor(private _http: Http) { }

    getAddress(data) {
        return this._http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + data.latitude + ',' + data.longitude + '&sensor=true')
            .map((res: Response) => res.json())
            .catch(err => err.json())
    }
}