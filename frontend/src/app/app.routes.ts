import { Routes } from '@angular/router';
import { Records } from './records/records';
import { Collections } from './collections/collections';
import { Projects } from './projects/projects';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { authGuard } from './guard/auth-guard';
import { guestguardGuard } from './guard/guestguard-guard';

export const routes: Routes = [

  // ✅ Routes publiques
  { path: 'login',    component: Login    , canActivate: [guestguardGuard]},
  { path: 'register', component: Register , canActivate: [guestguardGuard] },

  // 🔒 Routes protégées
  {
    path: '',
    canActivate: [authGuard],  // 🔒 guard appliqué
    children: [
      { path: 'projects',                                  component: Projects        },
      { path: 'projects/:id/collections',                  component: Collections     },
      { path: 'projects/:projectId/collections/:name',     component: Records         },
      { path: '',  redirectTo: 'projects', pathMatch: 'full'      },
    ]
  },

  // Fallback
  { path: '**', redirectTo: 'login' }
];
