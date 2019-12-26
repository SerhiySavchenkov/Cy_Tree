import * as dataProvider from '../data/dataProvider';

describe('Git Hub Login Page', () => {

  beforeEach(() => {
    cy.visit('https://www.github.com/');
    cy.get('[href="/login"]').click();
  })

  it('should have correct header', () => {
    cy.get('h1').should('have.text', "Sign in to GitHub");
    cy.url().should('include', 'login');
  })

  it(`should have warning message when login with empty login and password`, () => {
    cy.login(dataProvider.credentials.username_empty, dataProvider.credentials.password_empty);
    cy.get('.flash > .container').should('be.visible');
    cy.get('.flash > .container').should('contain', "Incorrect username or password.");
  })

  it(`should have warning message when login with incorrect login and incorrect password`, () => {
    cy.login(dataProvider.credentials.username_incorrect, dataProvider.credentials.password_incorrect);
    cy.get('.flash > .container').should('be.visible');
    cy.get('.flash > .container').should('contain', "Incorrect username or password.");
  })

  it(`should have warning message when login with incorrect login and correct password`, () => {
    cy.login(dataProvider.credentials.username_incorrect, dataProvider.credentials.password_correct);
    cy.get('.flash > .container').should('be.visible');
    cy.get('.flash > .container').should('contain', "Incorrect username or password.");
  })

  it(`should have warning message when login with correct login and incorrect password`, () => {
    cy.login(dataProvider.credentials.username_correct, dataProvider.credentials.password_incorrect);
    cy.get('.flash > .container').should('be.visible');
    cy.get('.flash > .container').should('contain', "Incorrect username or password.");
  })

  it(`should have open new page with heder about verification email`, () => {
    cy.login(dataProvider.credentials.username_correct, dataProvider.credentials.password_correct);
    cy.get('div h1').should('contain', "Please verify your email address");
    cy.url().should('include', 'https://github.com/account/unverified-email');
  })

  it(`should have open password reset page`, () => {
    cy.get('a[class="label-link"]').click();
    cy.get('div h1').should('contain', "Reset your password");
    cy.url().should('include', 'password_reset');
  })

  it(`should have open 'Create your account' page`, () => {
    cy.contains('Create an account').click();
    cy.get('div h1').should('contain', "Create your account");
    cy.url().should('include', 'join?source=login');
  })

  it(`should have open 'Terms' page`, () => {
    cy.contains('Terms').click();
    cy.get('article h1').should('contain', "GitHub Terms of Service");
    cy.url().should('include', 'github-terms-of-service');
  })

  it(`should have open 'Privacy' page`, () => {
    cy.contains('Privacy').click();
    cy.get('article h1').should('contain', "GitHub Privacy Statement");
    cy.url().should('include', 'github-privacy-statement');
  })

  it(`should have open 'Security' page`, () => {
    cy.contains('Security').click();
    cy.get('div h1').should('contain', "Security at GitHub");
    cy.url().should('include', 'security');
  })

  it(`should have open 'Contact GitHub' page`, () => {
    cy.contains('Contact GitHub').click();
    cy.get('div h1').should('contain', "What can we help with?");
    cy.url().should('include', 'https://support.github.com/');
  })
  })