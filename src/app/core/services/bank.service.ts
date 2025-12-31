import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { env } from "../../enviroment/env";
import { BankDTO } from "../dto/bank.dto";

@Injectable({
    providedIn: 'root'
})

export class BankService {

    private readonly baseUrl = `${env.api}/bank`;

    constructor(private readonly http: HttpClient) {}

    findAll() {
        return this.http.get<BankDTO[]>(`${this.baseUrl}/find-all`);
    }
}