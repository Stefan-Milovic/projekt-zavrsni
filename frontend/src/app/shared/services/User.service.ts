import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/components/profile/User.model';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private httpClient: HttpClient) {

    }
    registerUser(user: User) {

        return this.httpClient.post(`${environment.serverUrl}/registration`, user);
    }
    loginUser(email: string, password: string) {
        return this.httpClient.post(`${environment.serverUrl}/login`, { email, password });
    }
    get loggedUser() {
        return JSON.parse(localStorage.getItem('loggedUser') || '{}') || new User();
    }

    getUsers() {
        return this.httpClient.get(`${environment.serverUrl}/user`)
    }

    deleteUser(id: any) {
        return this.httpClient.delete(`${environment.serverUrl}/user/` + id)
    }

    updateUser(id: any, user: any) {
        console.log('u user service', id, user);

        return this.httpClient.put(`${environment.serverUrl}/user/` + id, user)
    }
    banUser(id: any) {
        return this.httpClient.put(`${environment.serverUrl}/user/ban/` + id, {})
    }
}
//ENV = LOCALHOST