import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.default)
    },
    {
        path: 'checklist/:id',
        loadComponent: () => import('./checklist/checklist/checklist.component').then(m => m.default)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
