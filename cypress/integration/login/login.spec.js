import * as dataProvider from '../data/dataProvider';

const LOGIN_BTN = '[href="/login"]';
const HEADER = 'h1';
const WARNING_CONTAINER = '.flash > .container';
const DIV_HEADER = 'div h1';
const RESET_PASSWORD_LINK = 'a[class="label-link"]';
const ARTICLE_HEADER = 'article h1';

describe('Git Hub Login Page', () => {

  beforeEach(() => {
    cy.visit(dataProvider.links.github.gitHubMainLink);
    cy.get(LOGIN_BTN).click();
  })

  it('should have correct header', () => {
    cy.get(HEADER).should('have.text', "Sign in to GitHub");
    cy.url().should('include', 'login');
  })

  it(`should have warning message when login with empty login and password`, () => {
    cy.login(dataProvider.credentials.username_empty, dataProvider.credentials.password_empty);
    cy.get(WARNING_CONTAINER).should('be.visible');
    cy.get(WARNING_CONTAINER).should('contain', "Incorrect username or password.");
  })

  it(`should have warning message when login with incorrect login and incorrect password`, () => {
    cy.login(dataProvider.credentials.username_incorrect, dataProvider.credentials.password_incorrect);
    cy.get(WARNING_CONTAINER).should('be.visible');
    cy.get(WARNING_CONTAINER).should('contain', "Incorrect username or password.");
  })

  it(`should have warning message when login with incorrect login and correct password`, () => {
    cy.login(dataProvider.credentials.username_incorrect, dataProvider.credentials.password_correct);
    cy.get(WARNING_CONTAINER).should('be.visible');
    cy.get(WARNING_CONTAINER).should('contain', "Incorrect username or password.");
  })

  it(`should have warning message when login with correct login and incorrect password`, () => {
    cy.login(dataProvider.credentials.username_correct, dataProvider.credentials.password_incorrect);
    cy.get(WARNING_CONTAINER).should('be.visible');
    cy.get(WARNING_CONTAINER).should('contain', "Incorrect username or password.");
  })

  it(`should have open new page with heder about verification email`, () => {
    cy.login(dataProvider.credentials.username_correct, dataProvider.credentials.password_correct);
    cy.get(DIV_HEADER).should('contain', "Please verify your email address");
    cy.url().should('include', dataProvider.links.github.gitHubUnverifiedEmail);
  })

  it(`should have open password reset page`, () => {
    cy.get(RESET_PASSWORD_LINK).click();
    cy.get(DIV_HEADER).should('contain', "Reset your password");
    cy.url().should('include', 'password_reset');
  })

  it(`should have open 'Create your account' page`, () => {
    cy.contains('Create an account').click();
    cy.get(DIV_HEADER).should('contain', "Create your account");
    cy.url().should('include', 'join?source=login');
  })

  it(`should have open 'Terms' page`, () => {
    cy.contains('Terms').click();
    cy.get(ARTICLE_HEADER).should('contain', "GitHub Terms of Service");
    cy.url().should('include', 'github-terms-of-service');
  })

  it(`should have open 'Privacy' page`, () => {
    cy.contains('Privacy').click();
    cy.get(ARTICLE_HEADER).should('contain', "GitHub Privacy Statement");
    cy.url().should('include', 'github-privacy-statement');
  })

  it(`should have open 'Security' page`, () => {
    cy.contains('Security').click();
    cy.get(DIV_HEADER).should('contain', "Security at GitHub");
    cy.url().should('include', 'security');
  })

  it(`should have open 'Contact GitHub' page`, () => {
    cy.contains('Contact GitHub').click();
    cy.get(DIV_HEADER).should('contain', "What can we help with?");
    cy.url().should('include', dataProvider.links.github.gitHubSupport);
  })
  })