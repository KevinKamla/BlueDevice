import { Component, OnInit } from '@angular/core';
import { BleClient, ScanResult } from '@capacitor-community/bluetooth-le';

@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.page.html',
  styleUrls: ['./bluetooth.page.scss'],
})
export class BluetoothPage implements OnInit {

  constructor() { }

  varBleClient = BleClient;
  valueChecked: boolean = false;
  isActive: boolean = false;
  ifScan: boolean = false;
  listAppareils: any[] = [];
  listAppareilsTest: any;
  devi: any;


  async initialize() {
    try {
      await BleClient.initialize()
    } catch (err) {
      console.log("Erreur d'initialisation : ", err);
    }
  }

  async activer() {
    try {
      await BleClient.enable()
    } catch (err) {
      console.log("=====Erreur d'activation : ====", err);
    }
  }

  async desactiver() {
    try {
      await BleClient.disable()
    } catch (err) {
      console.log("====Erreur de désactivation : ====", err);
    }
  }

  async searchAppareil() {
    this.ifScan = true;
    try {
      await BleClient.requestLEScan({}, (result: ScanResult) => {
        console.log("result : ", result.device.name)
        this.listAppareilsTest = result
      })
      this.devi = await BleClient.requestDevice({})
    } catch (error) {
      console.log("====Erreur de recherche : ====", error);
    }



  }

  async stopScan() {
    this.ifScan = false;
    try {
      await BleClient.stopLEScan()
    } catch (error) {
      console.log("====Erreur de désactivation : ====", error);
    }
  }


  toggleChanged(e: any) {
    this.isActive = e.detail.checked;
    this.valueChecked = e.detail.checked;
    if (this.isActive === true) {
      this.activer();
    } else {
      this.desactiver();
    }

  }


  ngOnInit() {
    this.initialize();
    // this.valueChecked = BleClient.isEnabled ? true : false;
    console.log("toggle: ", BleClient.isEnabled)

  }

}
