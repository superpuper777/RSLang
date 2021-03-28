import {
  Component, Input, Output, EventEmitter,
} from '@angular/core';

import { CollectionWords } from '../../models/collection-words.model';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class Collections {
  @Input() collections!: CollectionWords[];
  @Output() group: EventEmitter<number> = new EventEmitter<number>();

  setGroupSelected(collection: CollectionWords): void {
    this.group.emit(collection.id);
  }
}
