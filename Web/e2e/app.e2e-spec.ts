import { ZKUPage } from './app.po';

describe('zku App', () => {
  let page: ZKUPage;

  beforeEach(() => {
    page = new ZKUPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
