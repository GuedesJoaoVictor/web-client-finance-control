import { BankDTO } from "./bank.dto";
import { UserDTO } from "./user.dto";

export class UserBankDTO {
    id?: number;
    name?: string;
    totalAmount?: number;
    user?: UserDTO;
    bank?: BankDTO;
}