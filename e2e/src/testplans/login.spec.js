//import WelcomePage from '../page-objects/welcome.po';


describe('Sign In', () => {
  it('should show an error message on empty input', () => {
    cy.visit('https://github.com/');
    cy.get('[href="/login"]').click();
    cy.url().should('include', '/login');
    cy.get('div h1').should('have.value', 'Sign in to GitHub');
    
  });

  // more tests
});