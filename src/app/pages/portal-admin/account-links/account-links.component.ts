import { Component, OnInit, signal } from "@angular/core";
import { AccountLinksService } from "../../../core/services/account-links.service";
import { UserBankDTO } from "../../../core/dto/user-bank.dto";
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCellDef } from "@angular/material/table";
import Swal from "sweetalert2";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: "app-account-links",
    templateUrl: "./account-links.component.html",
    styleUrls: ["./account-links.component.css"],
    imports: [MatTable, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCellDef, ReactiveFormsModule],
})
export class AccountLinksComponent implements OnInit {

    isLoading = signal(false);
    accountLinks = new MatTableDataSource<UserBankDTO>([]);

    constructor(private readonly accountLinksService: AccountLinksService) {}

    ngOnInit(): void {
        this.isLoading.set(true);
        this.accountLinksService.findAll().subscribe({
            next: (response) => {
                this.accountLinks.data = response;
                this.isLoading.set(false);
            }, error: (err) => {
                console.error('Error fetching account links:', err);
                Swal.fire('Error', 'Could not load account links. Please try again later.', 'error');
                this.isLoading.set(false);
            }
        });
    }

}
