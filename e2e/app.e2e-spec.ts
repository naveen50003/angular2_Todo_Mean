import { Angular2MEANPage } from './app.po';

describe('angular2-mean App', function() {
  let page: Angular2MEANPage;

  beforeEach(() => {
    page = new Angular2MEANPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
