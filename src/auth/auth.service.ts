import { Injectable } from '@nestjs/common';
import { EmployeeService } from '../users/users.service'

@Injectable()
export class AuthService {
    constructor(private readonly employeeService: EmployeeService) {}

    async validateUser(username: string, pass: string): Promise<any>{
        const employee = await this.employeeService.findOne(username);
        if(employee && employee.password === pass){
            const { password, ...result } = employee;
            return result;
        }
        return null;
    }

}
