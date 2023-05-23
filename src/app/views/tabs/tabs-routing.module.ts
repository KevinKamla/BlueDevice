import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('../../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'device',
        loadChildren: () => import('../../views/device/device.module').then(m => m.DevicePageModule)
      },
      {
        path: 'bluetooth',
        loadChildren: () => import('../../views/bluetooth/bluetooth.module').then(m => m.BluetoothPageModule)
      },
      {
        path: 'apropos',
        loadChildren: () => import('../../views/apropos/apropos.module').then(m => m.AproposPageModule)
      },
      {
        path: 'selectdevices',
        loadChildren: () => import('../../views/selectdevices/selectdevices.module').then( m => m.SelectdevicesPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }

