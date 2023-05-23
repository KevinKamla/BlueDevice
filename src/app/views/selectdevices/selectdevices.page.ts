import { Component, OnInit } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import * as TextEncoding from 'text-encoding';



@Component({
  selector: 'app-selectdevices',
  templateUrl: './selectdevices.page.html',
  styleUrls: ['./selectdevices.page.scss'],
})
export class SelectdevicesPage implements OnInit {


  devices: any[] = [];
  imgae: any;
  constructor(
    private ble: BLE,
  ) { }



  startScan() {
    this.devices = [];
    this.ble.scan([], 10).subscribe((device: any) => this.onDeviceDiscovered(device),);
  }
  onDeviceDiscovered(device: any) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.devices.push(device);

  }

  sendToDevice(device: any) {
    this.ble.isConnected(device.id).then(
      () => {
        this.ble.writeWithoutResponse(device.id, "ffe0", "ffe1", TextEncoding.TextEncoder().encode(this.imgae))
      },
      () => {
        this.connectToDevice(device);
        this.ble.writeWithoutResponse(device.id, "ffe0", "ffe1", TextEncoding.TextEncoder().encode(this.imgae))
      }
    )
  }


  connectToDevice(device: any) {
    this.ble
      .connect(device.id)
      .subscribe(
        (peripheral) => this.onConnected(peripheral),
        (peripheral) => this.onDeviceDisconnected(peripheral)
      );
  }

  onConnected(peripheral: any) {
  }

  onDeviceDisconnected(peripheral: any) {
  }

  ngOnInit() {
    this.imgae = localStorage.getItem("image");
  }

}
