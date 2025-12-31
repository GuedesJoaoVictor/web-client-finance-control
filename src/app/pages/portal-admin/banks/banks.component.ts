import { Component, OnInit } from '@angular/core';
import { BankService } from '../../../core/services/bank.service';
import { BankDTO } from '../../../core/dto/bank.dto';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-banks',
  imports: [MatTableModule],
  templateUrl: './banks.component.html',
  styleUrl: './banks.component.css',
})
export class BanksComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'type'];

  banks = new MatTableDataSource<BankDTO>();

  constructor(private readonly bankService: BankService) {}

  ngOnInit(): void {
    this.bankService.findAll().subscribe({
      next: (response) => {
        this.banks.data = response;
      }, error: (err) => {
        console.error('Error fetching banks:', err);
      }
    });
  }
}
