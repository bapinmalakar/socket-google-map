import { AngularAuctionPage } from './app.po';

describe('angular-auction App', () => {
  let page: AngularAuctionPage;

  beforeEach(() => {
    page = new AngularAuctionPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
