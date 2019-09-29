import { DomSanitizer } from '@angular/platform-browser';

import { DomSanitizerMock } from '@mocks/dom-sanitizer.mock';
import { SafePipe } from './safe.pipe';

describe('SafePipe', () => {
  let domSanitizer: DomSanitizer;

  beforeEach(() => {
    domSanitizer = new DomSanitizerMock();
  });

  it('create an instance', () => {
    const pipe = new SafePipe(domSanitizer);
    expect(pipe).toBeTruthy();
  });
});
