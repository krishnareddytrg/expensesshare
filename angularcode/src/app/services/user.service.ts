import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any>(`${API_URL}/users`);
    }

    getAllExpenses() {
        return this.http.get<any>(`${API_URL}/expenses`);
    }

    getById(id: number) {
        return this.http.get(`${API_URL}/users/` + id);
    }

    add(user: any) {
        return this.http.post(`${API_URL}/users`, user);
    }

    addAmount(postData: any) {
        return this.http.post(`${API_URL}/expenses`, postData);
    }

    getShareByUser() {
        return this.http.get<any>(`${API_URL}/user/report`);
    }

    deleteUser(userId: string) {
        return this.http.delete(`${API_URL}/users/${userId}`);
    }

    deleteExpense(expId: string) {
        return this.http.delete(`${API_URL}/expenses/${expId}`);
    }
}