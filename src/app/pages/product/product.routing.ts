/**
 * Created by Admin on 13-11-2016.
 */
import { Routes, RouterModule }  from '@angular/router';

import { Product } from './product.component';
// import { Inputs } from './components/inputs/inputs.component';
// import { Layouts } from './components/layouts/layouts.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Product

  }
];

export const routing = RouterModule.forChild(routes);
