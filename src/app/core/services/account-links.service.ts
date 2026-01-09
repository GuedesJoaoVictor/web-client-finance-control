import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { env } from "../../enviroment/env";
import { UserBankDTO } from "../dto/user-bank.dto";

@Injectable({
    providedIn: "root"
})

export class AccountLinksService {

    private readonly baseUrl = `${env.api}/bank`;

    constructor(private readonly http: HttpClient) {}

    findAll() {
        return this.http.get<UserBankDTO>(`${this.baseUrl}/find-all-links`);
    }

}