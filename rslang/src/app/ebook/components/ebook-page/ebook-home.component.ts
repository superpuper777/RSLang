import { Component, OnInit } from '@angular/core';

import { WordsDataService } from '../../../shared/services/words-data.service';
import { CONFIG_EBOOK } from '../../settings/constants/config-ebook';
import { Word } from '../../../shared/models/word.model';
import { WordsCollection } from '../../models/words-collection.model';

@Component({
  selector: 'app-ebook-home',
  templateUrl: './ebook-home.component.html',
  styleUrls: ['./ebook-home.component.scss'],
})
export class EbookHome implements OnInit {
  collections: WordsCollection[] = CONFIG_EBOOK.collections;
  collectionWords!: Word[];

  constructor(private wordsDataService: WordsDataService) {}

  ngOnInit(): void {
    this.collectionWords = this.wordsDataService.GetWords();
  }
}
