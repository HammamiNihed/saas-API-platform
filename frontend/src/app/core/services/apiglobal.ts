import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private api: AxiosInstance;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {

    this.api = axios.create({
      baseURL: 'http://localhost:3000'
    });

    this.api.interceptors.request.use((config) => {
      if (isPlatformBrowser(this.platformId)) {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers = config.headers || {};
          config.headers['Authorization'] = token;
        }
      }
      return config;
    });
  }

  get(url: string, config?: any) {
    return this.api.get(url, config);
  }

  post(url: string, data: any) {
    return this.api.post(url, data);
  }

  put(url: string, data: any) {
    return this.api.put(url, data);
  }

   patch(url: string, data: any) {
    return this.api.patch(url, data);
  }

  delete(url: string) {
    return this.api.delete(url);
  }

  // 🔑 API KEY
  getWithApiKey(url: string, apiKey: string) {
    return this.api.get(url, {
      headers: { 'x-api-key': apiKey }
    });
  }

  postWithApiKey(url: string, data: any, apiKey: string, config?: any) {
    return this.api.post(url, data, {
      ...config,
      headers: {
        ...(config?.headers || {}),
        'x-api-key': apiKey
      }
    });
  }

  // ✅ PUT avec API Key
  putWithApiKey(url: string, data: any, apiKey: string, config?: any) {
    return this.api.put(url, data, {
      ...config,
      headers: {
        ...(config?.headers || {}),
        'x-api-key': apiKey
      }
    });
  }

  // ✅ DELETE avec API Key
  deleteWithApiKey(url: string, apiKey: string, config?: any) {
    return this.api.delete(url, {
      ...config,
      headers: {
        ...(config?.headers || {}),
        'x-api-key': apiKey
      }
    });
  }

}