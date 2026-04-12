import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ApiService } from '../core/services/apiglobal'
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

interface Field {
  name: string;
  type: string;
}

@Component({
  selector: 'app-collections',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './collections.html',
  styleUrl: './collections.css',
})


export class Collections implements OnInit {

  fields: Field[] = [];
  name = '';
  projectId = '';
  collections: any[] = [];
  constructor(private api: ApiService, private route: ActivatedRoute, private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  async ngOnInit() {
    this.projectId = this.route.snapshot.params['id'];
    await this.loadCollections();
  }

  async loadCollections() {
    if (isPlatformBrowser(this.platformId)) {
      const res = await this.api.get(`/collections/${this.projectId}`);
      console.log(res.data)
      this.collections = res.data;
      this.cdr.detectChanges();
    }
  }

  addField() {
    this.fields.push({ name: '', type: 'string' });
  }

  async createCollection() {
    if (isPlatformBrowser(this.platformId)) {
    const res = await this.api.post('/collections', {
      projectId: this.projectId,
      name: this.name,
      schema: this.fields
    });

    // ✅ ajouter à la liste
    this.collections.push(res.data);

    // ✅ reset form
    this.name = '';
    this.fields = [];
    this.cdr.detectChanges();
  }
}
}
