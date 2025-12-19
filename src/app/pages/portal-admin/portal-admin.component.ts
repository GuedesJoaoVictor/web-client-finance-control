import { Component } from '@angular/core';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {Router} from '@angular/router';

@Component({
  selector: 'app-portal-admin',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent
  ],
  templateUrl: './portal-admin.component.html',
  styleUrl: './portal-admin.component.css',
})
export class PortalAdminComponent {

  public itens = [
    {
      label: 'Banks',
      description: 'Banks registered in the system',
      url: 'portal-admin/banks',
      icon: 'bank'
    },
    {
      label: 'Categories',
      description: 'Revenues and expenses categories',
      url: 'portal-admin/categories',
      icon: 'list'
    },
    {
      label: 'Users',
      description: 'All Users registered in the system',
      url: 'portal-admin/users',
      icon: 'user'
    },
    {
      label: 'Account links',
      description: 'Links between users and banks',
      url: 'portal-admin/links',
      icon: 'link'
    }
  ]

  constructor(private router: Router) {}

  redirect(url: string) {
    this.router.navigate([`/${url}`]).then();
  }
}
