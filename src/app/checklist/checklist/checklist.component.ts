import { Component, computed, effect, inject, signal } from '@angular/core';
import { ChecklistService } from '../../shared/data-access/checklist.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChecklistHeaderComponent } from '../ui/checklist-header/checklist-header.component';
import { ChecklistItemService } from '../data-access/checklist-item.service';
import { FormBuilder } from '@angular/forms';
import { ChecklistItem } from '../../shared/interfaces/checklist-item';
import { ModalComponent } from '../../shared/ui/modal/modal.component';
import { FormModalComponent } from '../../shared/ui/form-modal/form-modal.component';
import { ChecklistItemListComponent } from '../ui/checklist-item-list/checklist-item-list.component';

@Component({
  selector: 'app-checklist',
  imports: [ChecklistHeaderComponent, ModalComponent, FormModalComponent, ChecklistItemListComponent],
  template: `
    @if (checklist(); as checklist) {
    <app-checklist-header
      [checklist]="checklist"
      (addItem)="checklistBeignEdited.set({})"
    />
    <app-checklist-item-list [checklistItems]="items()"/>
    }
    <app-modal [isOpen]="!!checklistBeignEdited()">
      <ng-template>
        <app-form-modal
          title="Create item"
          [formGroup]="checkListItemForm"
          (save)="checkListItemService.add$.next({
              item: checkListItemForm.getRawValue(),
              checklistId: checklist()?.id!,
            })"
          (close)="checklistBeignEdited.set(null)"
        />
      </ng-template>
    </app-modal>
  `,
  styles: ``,
})
export default class ChecklistComponent {
  checklistService = inject(ChecklistService);
  checkListItemService = inject(ChecklistItemService);
  route = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);

  checklistBeignEdited = signal<Partial<ChecklistItem> | null>(null);

  params = toSignal(this.route.paramMap);

  checklist = computed(() =>
    this.checklistService
      .checklists()
      .find((checklist) => checklist.id === this.params()?.get('id'))
  );

  checkListItemForm = this.formBuilder.nonNullable.group({
    title: [''],
  });

  items = computed(() =>
    this.checkListItemService
      .checklistItems()
      .filter((item) => item.checklistId === this.params()?.get('id'))
  );

  constructor() {
    effect(() => {
      const checkListItem = this.checklistBeignEdited();
      if (!checkListItem) {
        this.checkListItemForm.reset();
      }
    });
  }
}
