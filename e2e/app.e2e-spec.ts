import { PhoteriaProfilePage } from './app.po';

describe('photeria-profile App', function() {
  let page: PhoteriaProfilePage;

  beforeEach(() => {
    page = new PhoteriaProfilePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
