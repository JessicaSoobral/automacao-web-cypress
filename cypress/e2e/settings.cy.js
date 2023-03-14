

describe('Settins', () => {

    beforeEach(() => {
        cy.loginByApi()
        cy.visit('/#/settings')

    })

    it('Efetuar logout', () => {
        cy.contains('Or click here to logout.').click()
        cy.screenshot()

    })

})