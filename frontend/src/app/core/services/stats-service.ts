// src/app/core/services/stats.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Stats {
  totalRequests: number;
  requestsChangePercent: number;
  totalCollections: number;
  collectionsThisMonth: number;
}

@Injectable({ providedIn: 'root' })
export class StatsService {
  private api = 'http://localhost:3000'; // adapte ton URL

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ Authorization: ` ${token}` }) };
  }

  async getStats(): Promise<Stats> {
    return firstValueFrom(
      this.http.get<Stats>(`${this.api}/stats`, this.getHeaders())
    );
  }
}