import { Component, OnInit } from '@angular/core';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { BleClient, ScanResult } from '@capacitor-community/bluetooth-le';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Camera, CameraResultType } from '@capacitor/camera';
import { BLE } from '@ionic-native/ble/ngx';

@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.page.html',
  styleUrls: ['./bluetooth.page.scss'],
})
export class BluetoothPage implements OnInit {

  constructor(
    private ble: BLE,
    private socialSharing: SocialSharing,
    public actionSheetController: ActionSheetController,) { }

  devices: any[] = [];
  statusMessage: string | undefined;
  chemin: string | undefined;
  chemin2: string | undefined;
  list_image: String[] = [];
  imageBase64!: string | String;
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
        this.listAppareilsTest = result.localName;
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

  //============================================= Ajout  =========================================

  async presentActionSheet(device: any) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Settings',
      buttons: [
        {
          text: 'Déconnecter',
          role: 'destructive',
          handler: () => {
            this.ble.disconnect(device.id).then(() => {
              console.log('Disconnected');
            });
          }
        },
        {
          text: 'Oublier',
          icon: 'trash',
          handler: () => { console.log('share clicked'); }
        },
      ]
    });
    await actionSheet.present();
    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  startScan() {    
    this.ifScan = true;
    this.devices = [];
    this.ble.scan([], 5).subscribe((device: any) => this.onDeviceDiscovered(device),);
  }

  onDeviceDiscovered(device: any) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.devices.push(device);

  }


  connectToDevice(device: any) {
    this.statusMessage = 'Connecting to ' + device.name + " id : " + device.id;
    this.ble
      .connect(device.id)
      .subscribe(
        (peripheral) => this.onConnected(peripheral),
        (peripheral) => this.onDeviceDisconnected(peripheral)
      );
  }

  onConnected(peripheral: any) {
    this.statusMessage = 'connected ' + (peripheral.name || peripheral.id);
  }

  onDeviceDisconnected(peripheral: any) {
    this.statusMessage = 'Disconnected ' + (peripheral.name || peripheral.id);
  }

  handleShare(image: any) {    
        console.log("Image", image)
        localStorage.setItem("image",image)
  }


  async getImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });

    var imageUrl = "data: image/png;base64," + image.base64String;//recupere l'image en string
    this.imageBase64 = imageUrl;
    console.log(image);
    this.chemin2 = imageUrl;
    this.list_image.push(this.imageBase64)// met l'image enregistre dans le tableau
  }


  ngOnInit() {
    this.initialize();
    // this.valueChecked = BleClient.isEnabled ? true : false;
    // console.log("toggle: ", BleClient.isEnabled)

  }

}
