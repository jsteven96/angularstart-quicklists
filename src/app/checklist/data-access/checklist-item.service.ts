import { computed, Injectable, signal } from '@angular/core';
import { AddChecklistItem, ChecklistItem } from '../../shared/interfaces/checklist-item';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface CheclistItemsState {
  checlistItems: ChecklistItem[];
}

@Injectable({
  providedIn: 'root'
})
export class ChecklistItemService {
  //state
  private state = signal<CheclistItemsState>({
    checlistItems: []
  });

  //selectors
  checklistItems = computed(() => this.state().checlistItems);

  //sources
  add$ = new Subject<AddChecklistItem>();

  constructor() {
    this.add$.pipe(takeUntilDestroyed()).subscribe((checklistItem) => 
      this.state.update((state) => ({
        ...state,
        checlistItems: [
          ...state.checlistItems,
          {
            ...checklistItem.item,
            id: crypto.randomUUID(),
            checklistId: checklistItem.checklistId,
            checked: false
          }
        ]
      }))
    )
   }
}
