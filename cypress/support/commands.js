import 'cypress-file-upload';

Cypress.Commands.add('login', (username, password) => {
    cy.get('#login_field').type(username);
    cy.get('#password').type(password);
    cy.get('.btn').click();
  })

  const addContext = require('mochawesome/addContext')
  Cypress.on('test:after:run', (test, runnable) => {
    if (test.state === 'failed') {
        const screenshotFileName = `${runnable.parent.title} -- ${test.title} (failed).png`
        addContext({ test }, `assets/${Cypress.spec.name}/${screenshotFileName}`)
    }
})

