import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MapService } from './app.service';
import * as io from 'socket.io-client';
declare var google: any;
declare var window: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    agm-map {
      height: 550px;
    }
  `]
})
export class AppComponent implements OnInit, AfterViewInit {
  price: number = 0.0;
  socket = null;
  bidValue = '';
  message = '';
  address = 'wait! Loading...';
  location: any = {
  };

  setPosition(position) {
    this.location['latitude'] = position.coords.latitude;
    this.location['longitude'] = position.coords.longitude;
    console.log('Position::: ', this.location);
    let self = this;
    this._mapService.getAddress(this.location)
      .subscribe(data => {
        console.log('address', data.results[0].address_components);
        let addressPart = data.results[0].address_components;
        if(addressPart.length){
          self.address = addressPart[0].long_name;
          addressPart.map(d=> {
            if( d.long_name != addressPart[0].long_name)
                self.address += ',' + d.long_name;
            })
        }
        else self.address = 'Address Not Found';
      }, err => console.log('Address Find Error::::', err))
  }

  constructor(private _mapService: MapService) { }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    };
    this.socket = io('http://localhost:8000');
    this.socket.on('priceUpdate', function (data) {
      this.price = data;
    }.bind(this));
    let self = this;
    this.socket.on('myid', function (data) {
      console.log('My id is: ', data);
      self.socket.emit('mydetails', { id: data, name: 'Biplab' });
    }.bind(this));

    this.socket.on('receive-message', function (data) {
      console.log('Receive Message is::::', data);
    }.bind(this));

  }

  ngAfterViewInit() {
    //setTimeout(this.fun1, 5000);
  }
  // fun1() {
  //   console.log('preparing to load...')
  //   let script = document.createElement('script');
  //   script.type = 'text/javascript';
  //   script.async = true;
  //   script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDBM8GfQbRRekkECNxSBHtzsHB7hdj2EWg&callback=initMap";
  //   script.charset = 'utf-8';
  //   document.getElementsByTagName('head')[0].appendChild(script);
  //   console.log('Append Done');
  // }

  bid() {
    this.socket.emit('bid', this.bidValue);
    this.bidValue = '';
  }


  sendMessage() {
    console.log('Send Call');
    this.socket.emit('sendmessage', { id: this.message, msg: 'Helo' });
    console.log('Call Done');
  }
}
