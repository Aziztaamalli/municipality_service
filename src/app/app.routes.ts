import { Routes } from '@angular/router';
import { HomepageComponent } from'./homepage/homepage.component';
import { ForgetComponent } from "./forget/forget.component";
import { FirstOneComponent } from './first-one/first-one.component';
import { LandingComponent } from './landing/landing.component';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { AdminComponent } from './admin/admin.component';
import { HospitalStaffComponent } from './hospital-staff/hospital-staff.component';
export const routes: Routes = [
  {path: '', component : LandingComponent},
  {path:'connect', component: HomepageComponent},
  {path: 'forget', component : ForgetComponent},
  {path: 'odkhol', component : QrCodeComponent  },
  {path: 'odkhollAdmin', component: AdminComponent},
  {path: 'okk', component: FirstOneComponent},
  {path :'staff', component: HospitalStaffComponent}

];
