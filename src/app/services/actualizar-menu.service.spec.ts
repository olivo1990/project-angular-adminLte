import { TestBed } from '@angular/core/testing';

import { ActualizarMenuService } from './actualizar-menu.service';

describe('ActualizarMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActualizarMenuService = TestBed.get(ActualizarMenuService);
    expect(service).toBeTruthy();
  });
});
