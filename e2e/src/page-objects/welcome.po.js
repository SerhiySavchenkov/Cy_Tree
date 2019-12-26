const SIGN_IN_BUTTON = '[href="/login"]';

export class WelcomePage {
    visit() {
      cy.visit('https://github.com/');
    }

    clickSignIn() {
        const buttonSignIn = cy.get(SIGN_IN_BUTTON);
        buttonSignIn.click();
      }
}