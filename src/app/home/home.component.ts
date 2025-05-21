import { Component, effect, inject, signal } from '@angular/core';
import { ModalComponent } from "../shared/ui/modal/modal.component";
import { Checklist } from '../shared/interfaces/checklist';
import { FormBuilder } from '@angular/forms';
import { FormModalComponent } from "../shared/ui/form-modal/form-modal.component";
import { ChecklistService } from '../shared/data-access/checklist.service';
import { ChecklistListComponent } from "./ui/checklist-list/checklist-list.component";

@Component({
  selector: 'app-home',
  imports: [ModalComponent, FormModalComponent, ChecklistListComponent],
  template: `
    <header>
      <h1>Quicklists</h1>
      <button (click)="checklistBeignEdited.set({})">Add checklist</button>
    </header>

    <section>
      <h2>Your checklists</h2>
      <app-checklist-list [checklists]="checklistService.checklists()" />
    </section>

    <app-modal [isOpen]="!!checklistBeignEdited()">
      <ng-template>
        <app-form-modal 
        [title]="checklistBeignEdited()?.title ? checklistBeignEdited()!.title! : 'Add Checklist'"
        [formGroup]="checklistForm"
        (close)="checklistBeignEdited.set(null)"
        (save)="checklistService.add$.next(checklistForm.getRawValue())">
        </app-form-modal>
      </ng-template>
    </app-modal>
  `,
  styles: ``
})
export default class HomeComponent {

  checklistService = inject(ChecklistService);

  constructor() {
    effect(() => {
      const checklist = this.checklistBeignEdited();
      if (!checklist) {
        this.checklistForm.reset();
      }
    })
  }

  checklistBeignEdited = signal<Partial<Checklist> | null>(null);
  formBuilder = inject(FormBuilder);

  checklistForm = this.formBuilder.nonNullable.group({
    title: [''],
  })

}
