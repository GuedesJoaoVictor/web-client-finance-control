import { Component, OnInit, signal } from '@angular/core';
import { BankService } from '../../../core/services/bank.service';
import { BankDTO } from '../../../core/dto/bank.dto';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatIcon } from "@angular/material/icon";
import { MatCard, MatCardContent } from "@angular/material/card";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel, MatInput, MatError } from "@angular/material/input";
import { MatAnchor } from "@angular/material/button";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-banks',
  imports: [MatTableModule, MatIcon, MatCard, MatCardContent, MatFormField, MatLabel, MatInput, MatError, ReactiveFormsModule, MatAnchor, MatProgressSpinner],
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css', '../users/users.component.css'],
})
export class BanksComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'type', 'actions'];

  banks = new MatTableDataSource<BankDTO>();
  bankForm!: FormGroup;
  editMode: boolean = false;
  currentBankId: number | null = null;
  isLoading = signal(false);

  constructor(private readonly bankService: BankService, private readonly fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit(): void {
    this.isLoading.set(true)
    this.bankService.findAll().subscribe({
      next: (response) => {
        this.banks.data = response;
        this.isLoading.set(false);
      }, error: (err) => {
        console.error('Error fetching banks:', err);
        Swal.fire('Error', 'Could not load banks. Please try again later.', 'error');
        this.isLoading.set(false);
      }
    });
  }

  private initForm() {
    this.bankForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', [Validators.required]]
    });
  }

  editBank(bank: BankDTO): void {
    this.bankForm.setValue({
      name: bank.name,
      type: bank.type
    });
    this.editMode = true;
    this.currentBankId = bank.id!;
  }

  deleteBank(bank: BankDTO): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete the bank "${bank.name}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bankService.delete(bank.id!).subscribe({
          next: (response) => {
            this.banks.data = this.banks.data.filter(b => b.id !== bank.id);
            Swal.fire('Deleted!', `The bank "${bank.name}" has been deleted.`, 'success');
          }, error: (err) => {
            console.error('Error deleting bank:', err);
            Swal.fire('Error', 'Could not delete the bank. Please try again later.', 'error');
          }
        });
      }
    })
  }

  updateBank(): void {
    if (this.bankForm.valid) {
      const { name, type } = this.bankForm.value as BankDTO;
      const dto: BankDTO = { id: this.currentBankId!, name, type }
      this.bankService.update(this.currentBankId!, dto).subscribe({
        next: (response) => {
          const index = this.banks.data.findIndex(b => b.id === this.currentBankId);
          if (index !== -1) {
            this.banks.data[index] = response.data;
            this.banks._updateChangeSubscription();
          }
          this.bankForm.reset({
            name: '',
            type: ''
          });
          this.editMode = false;
          this.currentBankId = null;
          Swal.fire('Success', `Bank "${response.data.name}" updated successfully.`, 'success');
        },
        error: (err) => {
          console.error('Error updating bank:', err)
          Swal.fire('Error', 'Could not update the bank. Please try again later.', 'error')
        }
      });
    }
  }

  addBank(): void {
    if (this.bankForm.valid) {
      const { name, type } = this.bankForm.value as BankDTO;
      const dto: BankDTO = { name, type }

      this.bankService.create(dto).subscribe({
        next: (response) => {
          this.banks.data = this.banks.data.concat(response.data);
          this.banks._updateChangeSubscription();
          this.bankForm.reset({
            name: '',
            type: ''
          });
          Swal.fire('Success', `Bank "${response.data.name}" added successfully.`, 'success');
        },
        error: (err) => {
          console.error('Error adding bank:', err)
          Swal.fire('Error', 'Could not add the bank. Please try again later.', 'error')
        }
      });
    }
  }

}
