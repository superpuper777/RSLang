import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

import { Word } from '../models/word.model';
import { CurrentStateBook } from '../../ebook/models/current-state-book.model';
import { WORDS_API_URL, WORDS_DATA } from '../constants/constants';
import { API_URL } from '../constants/api-url';
import { BaseDataService } from '../../core/services/base-data.service';

@Injectable()
export class WordsDataService extends BaseDataService<Word[]> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  GetWords(option: CurrentStateBook): Word[] {
    const apiWords: Word[] = [];
    const params: HttpParams = new HttpParams()
      .set('group', String(option.group - 1))
      .set('page', String(option.page - 1));
    this.getData(API_URL.WORDS, { params });
    this.data$.subscribe((words: Word[]) => {
      words.forEach((wordData) => {
        const word = { ...wordData };
        word.image = WORDS_API_URL + word.image;
        word.audio = WORDS_API_URL + word.audio;
        word.audioMeaning = WORDS_API_URL + word.audioMeaning;
        word.audioExample = WORDS_API_URL + word.audioExample;
        apiWords.push(word);
      });
    });
    return apiWords;
  }

  GetWordsMock(): Word[] {
    const apiWords: Word[] = [];
    WORDS_DATA.forEach((wordData) => {
      const word = wordData;
      word.image = WORDS_API_URL + word.image;
      word.audio = WORDS_API_URL + word.audio;
      word.audioMeaning = WORDS_API_URL + word.audioMeaning;
      word.audioExample = WORDS_API_URL + word.audioExample;

      apiWords.push(word);
    });
    return apiWords;
  }
}
