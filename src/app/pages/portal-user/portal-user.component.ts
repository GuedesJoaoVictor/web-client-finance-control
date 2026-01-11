import { Component } from "@angular/core";
import { MatCard, MatCardTitle, MatCardContent } from "@angular/material/card";
import { Router } from "@angular/router";

@Component({
    selector: "app-portal-user",
    templateUrl: "./portal-user.component.html",
    styleUrls: ["./portal-user.component.css"],
    imports: [MatCard, MatCardTitle, MatCardContent]
})

export class PortalUserComponent {

    public itens = [
        {
            label: "Dashboard",
            description: "Overview of your financial status",
            url: "portal-user/dashboard",
            icon: "dashboard"
        },
        {
            label: "Transactions",
            description: "View and manage your transactions",
            url: "portal-user/transactions",
            icon: "dollar"
        },
        {
            label: "Link Accounts",
            description: "Connect your bank accounts",
            url: "portal-user/link-accounts",
            icon: "link"
        }
    ];

    constructor(private readonly router: Router) {}

    redirect(url: string) {
        this.router.navigate([`/${url}`]).then();
    }

}