import { TestBed } from '@angular/core/testing';

import { TodoDataServiceService } from './todo-data-service.service';

describe('TodoDataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodoDataServiceService = TestBed.get(TodoDataServiceService);
    expect(service).toBeTruthy();
  });
});
