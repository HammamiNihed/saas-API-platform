import { Injectable } from '@angular/core';
import { ApiService } from '../services/apiglobal';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Projectservice {

  constructor(private api: ApiService) {} 

  http = 'http://localhost:3000';

  async getProjects() {
    const res = await this.api.get('/projects');
    return res.data;
  }

  async createProject(name: string) {
    const res = await this.api.post('/projects', { name });
    return res.data;
  }

  async updateProject(id: string, data: { name: string }){
  const res = await this.api.put(`/projects/${id}`, data);
    return res.data;
}

async deleteProject(id: string) {
  const res = await this.api.delete(`/projects/${id}`);
  return res.data;
}

async toggleProject(id: string) {
  
  const res =  await this.api.patch(`/projects/${id}/toggle`, {});
  return res.data;
  
}
  
}
