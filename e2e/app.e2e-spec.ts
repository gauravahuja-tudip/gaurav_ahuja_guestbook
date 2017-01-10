import { GUESTBOOKUIPage } from './app.po';

describe('guestbook-ui App', function() {
  let page: GUESTBOOKUIPage;

  beforeEach(() => {
    page = new GUESTBOOKUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
