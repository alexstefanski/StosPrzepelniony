import { StosPrzepelnionyPage } from './app.po';

describe('stos-przepelniony App', () => {
  let page: StosPrzepelnionyPage;

  beforeEach(() => {
    page = new StosPrzepelnionyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
