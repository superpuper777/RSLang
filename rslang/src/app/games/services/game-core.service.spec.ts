import { TestBed } from '@angular/core/testing';

import { GameCoreService } from './game-core.service';

describe('gameCoreService', () => {
  let service: GameCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
