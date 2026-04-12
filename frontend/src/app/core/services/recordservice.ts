import { Injectable } from '@angular/core';
import { ApiService } from './apiglobal';

@Injectable({
  providedIn: 'root'
})
export class Recordservice {

  constructor(private api: ApiService) {}

  async getRecords(projectId: string, collection: string, apiKey: string) {
    const res = await this.api.getWithApiKey(
      `/api/${projectId}/${collection}`,
      apiKey
    );
    return res.data;
  }

  async createRecord(projectId: string, collection: string, data: any, apiKey: string) {
    const res = await this.api.postWithApiKey(
      `/api/${projectId}/${collection}`,
      data,
      apiKey
    );
    return res.data;
  }

  // ✅ Update
  async updateRecord(projectId: string, collection: string, recordId: string, data: any, apiKey: string) {
    const res = await this.api.putWithApiKey(
      `/api/${projectId}/${collection}/${recordId}`,
      data,
      apiKey
    );
    return res.data;
  }

  // ✅ Delete
  async deleteRecord(projectId: string, collection: string, recordId: string, apiKey: string) {
    const res = await this.api.deleteWithApiKey(
      `/api/${projectId}/${collection}/${recordId}`,
      apiKey
    );
    return res.data;
  }

}