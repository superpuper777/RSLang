import { WordActionService } from 'src/app/shared/services/word-action.service';
import { StatisticsActionService } from 'src/app/shared/services/statistics-action.service';
import { GameStorageWordsService } from './game-storage-words.service';
import { GameUserWordsService } from './game-user-words.service';
import { GameCoreService } from './game-core.service';
import { WordsDataService } from '../../shared/services/words-data.service';
import { UserAggregatedWordsService } from '../../shared/services/user-words-data.service';
import { AuthService } from '../../auth/services/auth.service';

export const gameWordsFactory = (wordsDataService: WordsDataService, gameCoreService: GameCoreService,
  userAggregatedWordsService: UserAggregatedWordsService, authService: AuthService,
  wordActionService: WordActionService, statisticsActionService: StatisticsActionService):
GameStorageWordsService | GameUserWordsService => {
  if (authService.getIsUserAuthenticated()) {
    return new GameUserWordsService(gameCoreService, userAggregatedWordsService,
      wordsDataService, authService, wordActionService, statisticsActionService);
  }
  return new GameStorageWordsService(gameCoreService, wordsDataService);
};
