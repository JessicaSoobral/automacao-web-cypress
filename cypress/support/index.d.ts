
declare namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Efetua login via requisição na API
       * @example
       * cy.loginByApi()
       */
      loginByApi(): void
      
    }
  }