describe('Caffe Demos Main page', () => {

    beforeEach(() => {
      cy.visit('http://demo.caffe.berkeleyvision.org/');
    })

    it('should have header equals to "Caffe Demos"', () => {
      cy.get('h1 > a').should('have.text', "Caffe Demos");      
    });

    it('should have page description text', () => {
      cy.get('.page-header > p').contains("The Caffe neural network library makes implementing state-of-the-art computer vision systems easy.");
    });

    it('should navigate to "Deep learning framework page" ', () => {
      cy.get('.page-header > p').contains('Caffe').click();
      // cy.url().contains('http://caffe.berkeleyvision.org');
      cy.location().should((loc) => {
        expect(loc.origin).to.eq('http://caffe.berkeleyvision.org')
      })
    });

    it('should open quick example', () => {
      cy.contains('Click for a Quick Example').click();
      cy.get('div[class="media"]').should('be.visible');
      cy.get('body > div.container > p').invoke('text').then((text) => {
        expect(text).to.match(/\d+.\d{3}/);
      });
    });

    it('should have identify a "cat"', () => {
      cy.contains('Click for a Quick Example').click();
      cy.get('#myTab').contains('Maximally accurate').click();
      cy.get('#infopred h4').invoke('text').then((text) => {
        expect(text).to.contains("cat");
      })
      cy.get('#myTab').contains('Maximally specific').click();
      cy.get('#flatpred h4').invoke('text').then((text) => {
        expect(text).to.contains("cat");
      })
    })

    it('should warning message for incorrecy URL', () => {
      cy.get('#classifyurl').click();
      cy.get('div.alert.alert-danger').should('be.visible');
      cy.get('div.alert.alert-danger').should('contain', "Cannot open image from URL. Did you provide a valid URL or a valid image file? ");
    })

    it('should have identify an "apple"', () => {
      cy.get('#imageurl').type("https://vignette.wikia.nocookie.net/thefruitswiki/images/2/2b/Apple.jpg/revision/latest?cb=20190803231236");
      cy.get('#classifyurl').click();
      cy.get('#myTab').contains('Maximally accurate').click();
      cy.get('#infopred h4').invoke('text').then((text) => {
        expect(text).to.contains("apple");
      })
      cy.get('#myTab').contains('Maximally specific').click();
      cy.get('#flatpred h4').invoke('text').then((text) => {
        expect(text).to.contains("apple");
      })
    })

    



    
    //https://vignette.wikia.nocookie.net/thefruitswiki/images/2/2b/Apple.jpg/revision/latest?cb=20190803231236
      //.should('match', '\d+.\d{3}');
      //cy.url().should('match', /myregexp/)
      //body > div.container > p

      //expect(loc.search).to.eq('?q=dan')
      //Fcross-eyed-cat_2351472k.jpg

    // Quick Example


    // p > a
    // more tests
  });