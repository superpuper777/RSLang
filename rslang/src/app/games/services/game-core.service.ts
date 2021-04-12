import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/shared/constants/base-url';
import { GameResults } from 'src/app/shared/models/game-results.model';
import { Statistics } from 'src/app/shared/models/statistics.model';
import { WordWithStatistics } from 'src/app/shared/models/word-statistics.model';
import { Word } from 'src/app/shared/models/word.model';
import { GameName } from '../../shared/types/game-name.type';
import { LocalStorageService } from '../../core/services/local-storage.service';
@Injectable()
export class GameCoreService {
  constructor(private localStorageService: LocalStorageService) {}

  getWordsPath = (group: string, page: string): string => `${BASE_URL}/words?group=${group}&page=${page}`;

  getUserWordsPath = (group: string, page: string, id = ''): string => `${BASE_URL}/users/${id}/aggregatedWords`;

  addWordsToLocalStorage(words: WordWithStatistics[]): void {
    const pagesArray: Array<{ page: number; words: WordWithStatistics[] }> = [];
    words.forEach((item: WordWithStatistics) => {
      if (!pagesArray.length) {
        pagesArray.push({ page: item.page, words: [item] });
      } else {
        pagesArray.forEach((pageItem, index) => {
          if (pageItem.page === item.page) {
            pagesArray[index].words.push(item);
          } else {
            pagesArray.push({ page: item.page, words: [item] });
          }
        });
      }
    });
    pagesArray.forEach((item) => {
      const wordsString: string = JSON.stringify(item.words);
      this.localStorageService.setItem(`${item.words[0].group}-${item.page}`, wordsString);
    });
  }

  addStatsToLocalStorage(stats: Statistics): void {
    let result: Statistics | string | null = this.localStorageService.getItem('statistics');
    if (result) {
      try {
        result = JSON.parse(result) as Statistics;
      } catch {
        result = null;
      }
    }
    if (Array.isArray(result)) {
      result.push(stats);
      this.localStorageService.setItem('statistics', JSON.stringify(stats));
    }
  }

  getLocalStorageWords(group: string, page: string): WordWithStatistics[] | string | null {
    let result: WordWithStatistics[] | string | null = this.localStorageService.getItem(`${group}-${page}`);
    if (result) {
      try {
        result = JSON.parse(result) as WordWithStatistics[];
      } catch {
        result = null;
      }
    }
    return result;
  }

  addToSortedWords(sortedWords: WordWithStatistics[], unSortedwords: WordWithStatistics[]): WordWithStatistics[] {
    let sorted = sortedWords;
    unSortedwords.forEach((filterdWord: WordWithStatistics) => {
      sorted = sorted.map((sortedWord: WordWithStatistics) => {
        if (sortedWord.id === filterdWord.id) {
          return filterdWord;
        }
        return sortedWord;
      });
    });
    return sorted.filter((word: WordWithStatistics) => !word.isRemove && word.knowledgeDegree < 3);
  }

  decreasePageNumber(page: string): string {
    let pageInt: number = parseInt(page, 10);
    pageInt -= 1;
    return pageInt.toString();
  }

  playAudio(url: string): void {
    const audio = new Audio();
    audio.src = url;
    audio.load();
    audio.play().catch((err: Error) => {
      console.error(err);
    });
  }

  generateStats(gameResults: GameResults, gameStreak: number, name: GameName): Statistics {
    const statistics: Statistics = {
      correct_words: gameResults.correct_words,
      incorrect_words: gameResults.incorrect_words,
      game_name: name,
      streak: gameStreak,
      date: new Date(Date.now()),
    };
    return statistics;
  }

  toAggregatedWords(words: Word[]): WordWithStatistics[] {
    return words.map((elem) => ({
      ...elem,
      isRemove: false,
      isDifficult: false,
      toStudy: {},
      knowledgeDegree: 0,
    }));
  }
}
