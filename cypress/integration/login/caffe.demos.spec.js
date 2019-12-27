import * as dataProvider from '../data/dataProvider';

const HEADER = 'h1 > a';
const PAGE_HEADER = '.page-header > p';
const MEDIA_CONTAINER = 'div[class="media"]';
const INFORMATION_MESSAGE = 'body > div.container > p'
const TAB = '#myTab';
const MAXIMALLY_ACCURATE_ROWS = '#infopred h4';
const MAXIMALLY_SPECIFIC_ROWS = '#flatpred h4';
const CLASSIFY_URL_BTN = '#classifyurl';
const INPUT_FOR_IMAGE_URL= '#imageurl';
const WARNING_ALERT = 'div.alert.alert-danger';

describe('Caffe Demos Main page', () => {

    beforeEach(() => {
      cy.visit(dataProvider.links.caffe.caffeMainLink);
    })

    it('should have header equals to "Caffe Demos"', () => {
      cy.get(HEADER).should('have.text', "Caffe Demos");      
    });

    it('should have page description text', () => {
      cy.get(PAGE_HEADER).contains("The Caffe neural network library makes implementing state-of-the-art computer vision systems easy.");
    });

    it('should navigate to "Deep learning framework page" ', () => {
      cy.get(PAGE_HEADER).contains('Caffe').click();
      cy.location().should((loc) => {
        expect(loc.origin).to.eq(dataProvider.links.caffe.caffeFrameworkOverviewLink)
      })
    });

    it('should open quick example', () => {
      cy.contains('Click for a Quick Example').click();
      cy.get(MEDIA_CONTAINER).should('be.visible');
      cy.get(INFORMATION_MESSAGE).invoke('text').then((text) => {
        expect(text).to.match(/\d+.\d{3}/);
      });
    });

    it('should have warning message for incorrect URL', () => {
      cy.get(CLASSIFY_URL_BTN).click();
      cy.get(WARNING_ALERT).should('be.visible');
      cy.get(WARNING_ALERT).should('contain', "Cannot open image from URL. Did you provide a valid URL or a valid image file? ");
    })

    it('should have warning message for incorrect upload image', () => {
      const fileName = 'example.json';
      cy.fixture(fileName).then(fileContent => {
        cy.get('#imagefile').upload({ fileContent, fileName, mimeType: 'application/json' });
      });
      cy.get(WARNING_ALERT).should('be.visible');
      cy.get(WARNING_ALERT).should('contain', "Cannot open uploaded image. Did you provide a valid URL or a valid image file? ");
    })

    it('should have identify a "cat"', () => {
      cy.contains('Click for a Quick Example').click();
      cy.get(TAB).contains('Maximally accurate').click();
      cy.get(MAXIMALLY_ACCURATE_ROWS).invoke('text').then((text) => {
        expect(text).to.contains("cat");
      })
      cy.get(TAB).contains('Maximally specific').click();
      cy.get(MAXIMALLY_SPECIFIC_ROWS).invoke('text').then((text) => {
        expect(text).to.contains("cat");
      })
    })

    it('should have identify an "apple"', () => {
      cy.get(INPUT_FOR_IMAGE_URL).type(dataProvider.links.caffe.appleImageLink);
      cy.get(CLASSIFY_URL_BTN).click();
      cy.get(TAB).contains('Maximally accurate').click();
      cy.get(MAXIMALLY_ACCURATE_ROWS).invoke('text').then((text) => {
        expect(text).to.contains("apple");
      })
      cy.get(TAB).contains('Maximally specific').click();
      cy.get(MAXIMALLY_SPECIFIC_ROWS).invoke('text').then((text) => {
        expect(text).to.contains("apple");
      })
    })


    it('should have upload an image', () => {
      const fileName = '2UnitTests.png';
      cy.fixture(fileName).then(fileContent => {
        cy.get('#imagefile').upload({ fileContent, fileName, mimeType: 'application/png' });
      });
      cy.url().should('include', 'classify_upload');
      cy.get(MEDIA_CONTAINER).should('be.visible');
      cy.get(INFORMATION_MESSAGE).invoke('text').then((text) => {
        expect(text).to.match(/\d+.\d{3}/);
      });
    })

  });