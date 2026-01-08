import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { env } from "../../enviroment/env";
import { BankDTO } from "../dto/bank.dto";
import { ResponseDTO } from "../dto/response.dto";

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
        return this.http.post<ResponseDTO<BankDTO>>(`${this.baseUrl}`, BankDTO);
    }

    delete(id: number) {
        return this.http.delete<void>(`${this.baseUrl}/delete-by-id/${id}`, { responseType: 'text' as 'json' });
    }

    update(id: number, BankDTO: BankDTO) {
        return this.http.patch<ResponseDTO<BankDTO>>(`${this.baseUrl}/update-by-id/${id}`, BankDTO);
    }
}