describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = { username: "appsidal", password: "AppSiDaL6181" }
    cy.request('POST', `http://localhost:3001/api/users/`, user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login').click()
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#usernameInput').type('appsidal')
      cy.get('#passwordInput').type('AppSiDaL6181')
      cy.get('#loginButton').click()

      cy.contains('appsidal logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#usernameInput').type('wrong')
      cy.get('#passwordInput').type('wrong')
      cy.get('#loginButton').click()

      cy.get('.error')
        .should('contain', 'Wrong Credentials')
        .and('have.css', 'color', 'rgb(148, 14, 36)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Gilberto Davalos logged in')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'appsidal', password: 'AppSiDaL6181' })
    })

    it('A blog can be created', function () {
      cy.contains('Create New').click()
      cy.get('#titleInput').type('a blog created by cypress')
      cy.get('#authorInput').type('appsidal')
      cy.get('#urlInput').type('https://example.com/cypress')
      cy.contains('create').click()
      cy.contains('a blog created by cypress')
    })
    describe('With blogs', function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Introduction to JavaScript",
          author: "John Smith",
          url: "https://example.com/intro-to-javascript",
          likes:1
        })
        cy.createBlog({
          title: "CSS Tips and Tricks",
          author: "Jane Doe",
          url: "https://example.com/css-tips",
          likes:2
        })
        cy.createBlog({
          title: "Node.js and Express: Building APIs",
          author: "Alice Johnson",
          url: "https://example.com/nodejs-express-api",
          likes:3
        })
      })
      it('like button', () => {
        cy.contains('CSS Tips and Tricks Jane Doe')
          .contains('Show')
          .click()
        cy.contains('CSS Tips and Tricks Jane Doe')
        cy.contains('2').parent().find('button').click()
        cy.contains('3')
      });
      it('delete Button', () => {
        cy.contains('CSS Tips and Tricks Jane Doe')
          .contains('Show')
          .click()
        cy.contains('CSS Tips and Tricks Jane Doe')
        cy.contains('delete').parent().find('button').click()
        cy.contains('CSS Tips and Tricks Jane Doe').should('not.exist')
      });
      it('delete Button only available to right user', () => {
        cy.request('POST', 'http://localhost:3001/api/users',{ username: 'root', password: 'root' })
        cy.contains('Log out').parent().find('button').click()
        cy.login({ username: 'root', password: 'root' })
        cy.contains('CSS Tips and Tricks Jane Doe')
        .contains('Show')
        .click()
        cy.contains('delete').should('not.exist')
      });
      it.only('blogs Orderer by likes', () => {
        cy.get('.blog').eq(0).should('contain', 'Node.js and Express: Building APIs Alice Johnson')
        cy.get('.blog').eq(1).should('contain', 'CSS Tips and Tricks Jane Doe')
        cy.get('.blog').eq(2).should('contain', 'Introduction to JavaScript John Smith')
        cy.contains('CSS Tips and Tricks Jane Doe')
        .contains('Show')
        .click()
      cy.contains('CSS Tips and Tricks Jane Doe')
      cy.contains('2').parent().find('button').click()
      cy.contains('3').parent().find('button').click()
      cy.get('.blog').eq(0).should('contain', 'CSS Tips and Tricks Jane Doe')
      cy.get('.blog').eq(1).should('contain', 'Node.js and Express: Building APIs Alice Johnson')
      cy.get('.blog').eq(2).should('contain', 'Introduction to JavaScript John Smith')
      });

    });

  })
})