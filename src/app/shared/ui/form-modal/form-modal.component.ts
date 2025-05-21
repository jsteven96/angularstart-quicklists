import { KeyValuePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-modal',
  imports: [ReactiveFormsModule, KeyValuePipe],
  template: `
    <header>
      <h2>{{title()}}</h2>
    </header>
    <section>
      <form [formGroup]="formGroup()" (ngSubmit)="save.emit(); close.emit()">
        @for(control of formGroup().controls | keyvalue; track control.key) {
          <div>
            <label [for]="control.key">{{ control.key }}</label>
            <input type="text" [id]="control.key" [formControlName]="control.key" />
          </div>
        }
        <button type="submit">Save</button>
      </form>
    </section>
  `,
  styles: ``
})
export class FormModalComponent {
  formGroup = input.required<FormGroup>();
  title = input.required<string>();
  close = output();
  save = output();
}
