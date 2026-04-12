import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Projectservice } from '../core/services/projectservice';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StatsService, Stats } from '../core/services/stats-service';

@Component({
  selector: 'app-projects',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {

  projects: any[] = [];
  newProject = '';
  stats: Stats | null = null;

  // État pour l'édition
  editingProjectId: string | null = null;
  editingName: string = '';

  constructor(
    private projectservice: Projectservice,
    private cdr: ChangeDetectorRef,
    private statsService: StatsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      [this.projects, this.stats] = await Promise.all([
      this.projectservice.getProjects(),
      this.statsService.getStats()
    ]);
      this.cdr.detectChanges();
    }
  }

  async addProject() {
    if (isPlatformBrowser(this.platformId)) {
      const res = await this.projectservice.createProject(this.newProject);
      this.projects.push(res);
      this.newProject = '';
      this.cdr.detectChanges();
    }
  }

  // Activer le mode édition
  startEdit(project: any) {
    this.editingProjectId = project._id;
    this.editingName = project.name;
    this.cdr.detectChanges();
  }

  // Annuler l'édition
  cancelEdit() {
    this.editingProjectId = null;
    this.editingName = '';
  }

  // Confirmer la modification
  async confirmEdit(project: any) {
    if (!this.editingName.trim()) return;

    if (isPlatformBrowser(this.platformId)) {
      const updated = await this.projectservice.updateProject(project._id, { name: this.editingName });
      const index = this.projects.findIndex(p => p._id === project._id);
      if (index !== -1) this.projects[index] = updated;
      this.editingProjectId = null;
      this.editingName = '';
      this.cdr.detectChanges();
    }
  }

  // Supprimer un projet
  async deleteProject(projectId: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    const confirmed = confirm('Supprimer ce projet ?');
    if (!confirmed) return;

    await this.projectservice.deleteProject(projectId);
    this.projects = this.projects.filter(p => p._id !== projectId);
    this.cdr.detectChanges();
  }

  async toggleProject(project: any) {
    const updated = await this.projectservice.toggleProject(project._id);
    const index = this.projects.findIndex(p => p._id === project._id);
    if (index !== -1) this.projects[index] = updated;
    this.cdr.detectChanges();
  }
}