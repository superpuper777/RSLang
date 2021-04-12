import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GameCoreService } from 'src/app/games/services/game-core.service';
import { SharedModule } from '../../shared/shared.module';
import { MatchPairs } from './components/match-pairs/match-pairs.component';
import { MatchPairsRoutingModule } from './match-pairs-routing.module';

@NgModule({
  declarations: [MatchPairs],
  imports: [CommonModule, SharedModule, MatchPairsRoutingModule],
  providers: [GameCoreService],
})
export class MatchPairsModule { }
