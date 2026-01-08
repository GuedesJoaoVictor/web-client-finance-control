import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { env } from "../../enviroment/env";
import { ResponseDTO } from "../dto/response.dto";
import { CategoryDTO } from "../dto/category.dto";

@Injectable({
    providedIn: 'root'
})

export class CategoryService {

    private readonly baseUrl: string = `${env.api}/category`;

    constructor(private readonly http: HttpClient) {}

    findAll() {
        return this.http.get<ResponseDTO<CategoryDTO[]>>(`${this.baseUrl}/find-all`);
    }

    create(dto: CategoryDTO) {
        return this.http.post<CategoryDTO>(`${this.baseUrl}/create`, dto);
    }

    update(id: number, dto: CategoryDTO) {
        return this.http.patch<ResponseDTO<CategoryDTO>>(`${this.baseUrl}/update-by-id/${id}`, dto);
    }

    delete(id: number) {
        return this.http.delete<ResponseDTO<boolean>>(`${this.baseUrl}/delete-by-id/${id}`);
    }

}