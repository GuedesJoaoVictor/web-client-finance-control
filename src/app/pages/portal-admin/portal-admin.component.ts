import { Component } from '@angular/core';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';

@Component({
  selector: 'app-portal-admin',
  imports: [
    MatGridList,
    MatGridTile
  ],
  templateUrl: './portal-admin.component.html',
  styleUrl: './portal-admin.component.css',
})
export class PortalAdminComponent {

  public itens = [
    {
      label: 'Bancos',
      url: 'portal-admin/bancos',
      icon: 'bank'
    },
    {
      label: 'Categorias',
      url: 'portal-admin/categorias',
      icon: 'category'
    },
    {
      label: 'Usuários',
      url: 'portal-admin/usuarios',
      icon: 'people'
    },
    {
      label: 'Vinculos',
      url: 'portal-admin/vinculos',
      icon: 'link'
    }
  ]

  constructor() {}
}
