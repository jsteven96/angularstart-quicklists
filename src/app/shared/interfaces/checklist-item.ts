import { RemoveChecklist } from "./checklist";

export interface ChecklistItem {
    id: string;
    title: string;
    checklistId: string;
    checked: boolean;
}

export type AddChecklistItem = {
    item: Omit<ChecklistItem, 'id' | 'checklistId' | 'checked'>;
    checklistId: RemoveChecklist;
}

export type EditChecklistItem = {
    id: ChecklistItem['id'];
    data: AddChecklistItem['item'];
};

export type RemoveChecklistItem = ChecklistItem['id'];