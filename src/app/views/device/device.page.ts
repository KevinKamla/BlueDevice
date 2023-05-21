import { Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-device',
  templateUrl: './device.page.html',
  styleUrls: ['./device.page.scss'],
})
export class DevicePage implements OnInit {

  constructor() { }


  batteryLevele: number = 0;
  isCharging: boolean = false;
  deviceName: string = "";
  deviceModel: string = "";
  platform: string = "";
  osVersion: string = "";
  manufacturer: string = "";
  usedMemory: number = 0;
  freeStorage: number = 0;
  totalStorage: number = 0;
  usedStorage: number = 0;
  language: string = "";
  progress1: number = 0;
  uid:number = 0;


  
  async ionViewDidEnter() {
    await this.initializePhoneInfo();
  }

  
  async initializePhoneInfo() {
    try {
      const batteryInfo = await Device.getBatteryInfo();
      this.batteryLevele = Math.floor((batteryInfo.batteryLevel ?? 1) * 100);
      this.isCharging = batteryInfo.isCharging ?? false;
      const deviceInfo = await Device.getInfo();
      this.uid = deviceInfo.androidSDKVersion ?? 0;
      this.deviceName = deviceInfo.name ?? "name";
      this.deviceModel = deviceInfo.model;
      this.platform = deviceInfo.platform;
      this.osVersion = deviceInfo.osVersion;
      this.manufacturer = deviceInfo.manufacturer;
      this.totalStorage = Math.floor((deviceInfo.realDiskTotal ?? 16000000000) / (1000000000));
      this.freeStorage = Math.floor((deviceInfo.realDiskFree ?? 5000000000) / (1000000000));
      this.usedStorage = this.totalStorage - this.freeStorage;
      this.progress1 = (this.usedStorage/this.totalStorage)*100;
      this.language = (await Device.getLanguageCode()).value;

    } catch (err) {
      console.log("========== Erreur de récupération des informations du phone ==========")
    }
  }

  handleRefresh(e:any) {
    setTimeout(() => {
      this.ionViewDidEnter();
      e.target.complete();
    }, 2000);
  }


  ngOnInit() {
  }

}
