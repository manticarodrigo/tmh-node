import { TmhPage } from './app.po';

describe('tmh App', () => {
  let page: TmhPage;

  beforeEach(() => {
    page = new TmhPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
