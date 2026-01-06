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

    create(BankDTO: BankDTO) {
        return this.http.post<BankDTO>(`${this.baseUrl}/create`, BankDTO);
    }

    delete(id: number) {
        return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
    }

    update(id: number, BankDTO: BankDTO) {
        return this.http.put<BankDTO>(`${this.baseUrl}/update/${id}`, BankDTO);
    }
}