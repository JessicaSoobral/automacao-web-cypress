
describe(' Sign Up / Cadastro', () => {

    beforeEach(() => {
        cy.visit("/#/register")
    });

    it('Cadastro com sucesso', () => {

        //Arrange

        cy.intercept({
            method: 'POST',
            hostname: 'api.realworld.io',
            pathname: '/api/users'

        }).as('postUsers')

        const time = new Date().getTime()

        // Act

        cy.get('[placeholder="Username"]').type(`username-${time}`)
        cy.get('[placeholder="Email"]').type(`username-${time}@mail.com`)
        cy.get('[placeholder="Password"]').type('12345')
        cy.get('button[type="submit"]').click()

        //Ou podemos usar também usar o submit para submeter um formulário
        //cy.get('form[ng-submit]').submit()

        //Assert

        cy.contains('Your Feed').should('be.visible')
        cy.get('a[href*=username]').should('contain', `username-${time}`)


        cy.wait('@postUsers').then(interception => {

            // Expect (info) dos resultados

            expect(interception.response.statusCode).to.be.eq(200)
            expect(interception.response.body.user.token).to.not.be.empty

        })

    });

    it('Cadastro com servidor fora do Ar', () => {

        cy.intercept({
            method: 'POST',
            hostname: 'api.realworld.io',
            pathname: '/api/users'
        }, {
            statusCode: 500,
            body: {
                "errors": {
                 "server": ["ATPI intercept com Mock"]
                }
            }

        }).as('postUsersMock')

        const time = new Date().getTime()

        // Preenchendo formulário

        cy.get('[placeholder="Username"]').type(`username-${time}`)
        cy.get('[placeholder="Email"]').type(`username-${time}@mail.com`)
        cy.get('[placeholder="Password"]').type('12345')
        cy.get('button[type="submit"]').click()
    })

    
    
     it('Usuário não pode ser em branco', () => {
            
            const time = new Date().getTime()
            cy.visit("https://demo.realworld.io/#/register")
            cy.get('[placeholder="Email"]').type(`username-${time}@mail.com`)
            cy.get('[placeholder="Password"]').type('12345')
            cy.get('button[type="submit"]') .click()
            cy.get('.error-messages').contains("username can't be blank")
    
    });
    
    
     it('E-mail não pode ser em branco', () => {
            
            const time = new Date().getTime()
            cy.visit("https://demo.realworld.io/#/register")
            cy.get('[placeholder="Username"]').type(`username-${time}`)
            cy.get('[placeholder="Password"]').type('12345')
            cy.get('button[type="submit"]') .click()
            cy.get('.error-messages').contains("email can't be blank")
     });
        
    
    it('Senha não pode ser em branco', () => {
      
            const time = new Date().getTime()
            cy.visit("https://demo.realworld.io/#/register")
            cy.get('[placeholder="Username"]').type(`username-${time}`)
            cy.get('[placeholder="Email"]').type(`username-${time}@mail.com`)
            cy.get('button[type="submit"]') .click()
            cy.get('.error-messages').contains("password can't be blank")     
            
    });

    

});



