import { Component, input } from '@angular/core';
import { Checklist } from '../../../shared/interfaces/checklist';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checklist-list',
  imports: [RouterLink],
  template: `
    <ul>
    @for (item of checklists(); track item.id) {
      <li>
        <a routerLink="/checklist/{{item.id}}">{{ item.title }}</a>
      </li>
    } @empty {
      <p>Click the add button to create your first checklist</p>
    }
    </ul>
  `,
  styles: ``
})
export class ChecklistListComponent {
  checklists = input.required<Checklist[]>();
}
