import { Routes } from '@angular/router';
import { ROUTE_TOKENS } from './models/route-tokens';

export const routes: Routes = [
  {
    path: ROUTE_TOKENS.products,
    loadChildren: () => import('./product-view/product-view.routes').then(m => m.ROUTES),
    title: 'Just Like People - Products',
  },
  {
    path: '',
    redirectTo: ROUTE_TOKENS.home,
    pathMatch: 'full',
  },
  {
    path: ROUTE_TOKENS.home,
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    title: 'Just Like People - Home',
  },
  {
    path: ROUTE_TOKENS.contact,
    loadChildren: () => import('./contact/contact-routes').then(m => m.CONTACT_ROUTES),
    title: 'Just Like People - Contact',
  },
  {
    path: ROUTE_TOKENS.cart,
    loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent),
    title: 'Just Like People - Cart',
  },
  {
    path: ROUTE_TOKENS.list,
    loadComponent: () => import('./table-view/table-view.component').then(m => m.TableViewComponent),
    title: 'Just Like People - Cart',
  },
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Just Like People - Page Not Found',
  },
];
