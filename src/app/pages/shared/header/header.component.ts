import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatMenu} from '@angular/material/menu';
import {MatDivider} from '@angular/material/list';
import {MatChip, MatChipListbox} from '@angular/material/chips';

@Component({
  selector: 'app-header',
  imports: [
    MatFormField,
    MatLabel,
    MatIcon,
    MatMenu,
    MatDivider,
    MatChipListbox,
    MatChip
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  userMenu = new MatMenu();

}
