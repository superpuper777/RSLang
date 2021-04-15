import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsCollections } from './words-collections.component';
import { WordsCollection } from '../../models/words-collection.model';

describe('WordsCollections', () => {
  let component: WordsCollections;
  let fixture: ComponentFixture<WordsCollections>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WordsCollections],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsCollections);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
  it('raiser the selected event when clicked', () => {
    const comp = new WordsCollections();
    const wordsCollections: WordsCollection[] = [
      {
        id: 1,
        name: 'collection #2',
        path: 'group',
        img: '../assets/collections/collections-2.png',
        pages: 30,
        words: 600,
        progress: 0,
      },
    ];
    comp.wordsCollections = wordsCollections;

    comp.groupIdChanged.subscribe(selectedWordsCollection => expect(selectedWordsCollection).toContain(wordsCollections))
  })
});
