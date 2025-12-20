import {Component, Input} from '@angular/core';
import {MatChip, MatChipListbox} from '@angular/material/chips';
import {Router} from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  imports: [
    MatChip,
    MatChipListbox
  ],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
})
export class Breadcrumb {

  @Input() breadCrumbs: any[] = [];

  constructor(private router: Router) {}

  redirectTo(url: string) {
    this.router.navigate([`/${url}`]).then();
  }
}
