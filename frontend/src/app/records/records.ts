import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ApiService } from '../core/services/apiglobal';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Recordservice } from '../core/services/recordservice';

@Component({
  selector: 'app-records',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './records.html',
  styleUrl: './records.css',
})
export class Records implements OnInit {

  projectId = '';
  collectionName = '';
  apiKey = '';
  projectBlocked = false;

  records: any[] = [];
  schema: any[] = [];
  formData: any = {};
  editId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private recordService: Recordservice,
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.projectId = this.route.snapshot.params['projectId'];
    this.collectionName = this.route.snapshot.params['name'];

    await this.loadApiKey();
    await this.loadSchema();
    this.initForm();
    await this.loadRecords();
  }

  async loadApiKey() {
    if (!isPlatformBrowser(this.platformId)) return;
    const res = await this.api.get('/projects');
    const project = res.data.find((p: any) => p._id === this.projectId);
    if (project) {
      this.apiKey = project.apiKey;
    }
  }

  async loadSchema() {
    const res = await this.api.get(`/collections/${this.projectId}`);
    const col = res.data.find((c: any) => c.name === this.collectionName);
    this.schema = col.schema;
  }

  async loadRecords() {
  if (isPlatformBrowser(this.platformId)) {
    try {
      this.records = await this.recordService.getRecords(
        this.projectId,
        this.collectionName,
        this.apiKey
      );
      this.projectBlocked = false;
    } catch (err: any) {
      if (err?.response?.status === 403) {
        this.projectBlocked = true; // ← projet désactivé
      }
    }
    this.cdr.detectChanges();
  }
}

  initForm() {
    this.formData = {};
    this.schema.forEach(field => {
      this.formData[field.name] = '';
    });
  }

  // ✅ Pré-remplir le formulaire pour l'édition
  startEdit(record: any) {
    this.editId = record._id;
    this.formData = { ...record.data }; // copie des données du record
    this.cdr.detectChanges();
  }

  // ✅ Annuler l'édition
  cancelEdit() {
    this.editId = null;
    this.initForm();
    this.cdr.detectChanges();
  }

  // ✅ Créer ou mettre à jour selon editId
  async save() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.editId) {
        // Mode UPDATE
        await this.recordService.updateRecord(
          this.projectId,
          this.collectionName,
          this.editId,
          this.formData,
          this.apiKey
        );
      } else {
        // Mode CREATE
        await this.recordService.createRecord(
          this.projectId,
          this.collectionName,
          this.formData,
          this.apiKey
        );
      }

      await this.loadRecords();
      this.initForm();
      this.editId = null;
    }
  }

  // ✅ Supprimer un record
  async deleteRecord(recordId: string) {
    if (!isPlatformBrowser(this.platformId)) return;

    const confirmed = confirm('Supprimer ce record ?');
    if (!confirmed) return;

    await this.recordService.deleteRecord(
      this.projectId,
      this.collectionName,
      recordId,
      this.apiKey
    );

    this.records = this.records.filter(r => r._id !== recordId);
    this.cdr.detectChanges();
  }
}