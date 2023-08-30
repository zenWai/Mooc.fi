describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Name Admin',
      username: 'adminusername',
      password: 'adminpassword'
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:5173');
  });
  it('Login form is shown', function () {
    cy.get('#username').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('#login-button').should('be.visible');
  });
  describe('Login', function () {
    it('User fail to login', function () {
      cy.get('#username').type('failusername');
      cy.get('#password').type('failpassword');
      cy.get('#login-button').click();
      cy.contains('Wrong Username or Password');
      cy.get('.error').should('be.visible');
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
    it('User can login', function () {
      cy.get('#username').type('adminusername');
      cy.get('#password').type('adminpassword');
      cy.get('#login-button').click();
      cy.contains('Name Admin logged in');
    });
  });
  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('#username').should('be.visible').type('adminusername');
      cy.get('#password').should('be.visible').type('adminpassword');
      cy.get('#login-button').should('be.visible').click();
    });
    it('Logout button is shown and logout', function () {
      cy.get('#logout-button').should('be.visible').click();
      cy.get('#username').should('be.visible');
      cy.get('#password').should('be.visible');
      cy.get('#login-button').should('be.visible');
    });
    describe('when a blog is created', function () {
      beforeEach(function () {
        cy.get('#togglable-show-label-button').contains('Create New').click();
        cy.get('#create-form-title').should('be.visible');
        cy.get('#create-form-input-title')
          .should('be.visible')
          .type('Blog Title Test Create');
        cy.get('#create-form-input-author')
          .should('be.visible')
          .type('Name Author');
        cy.get('#create-form-input-url')
          .should('be.visible')
          .type('https://www.google.com');
        cy.get('#create-form-create-post-button').click();
        cy.contains('Blog Title Test Create by Name Author added');
        // message success
        cy.get('.success').should('be.visible');
      });
      it('Blog created successfully', function () {
        cy.get('#blog-titleauthor')
          .should('be.visible')
          .should('contain', 'Blog Title Test Create By Name Author');
      });
      it('A blog can be liked, increase and decrease count', function () {
        cy.get('.blog-parent-div')
          .eq(0)
          .within(() => {
            cy.get('#togglable-show-label-button').click();
            cy.get('#blog-like-button').should('contain', 'Like').click();
            cy.get('#blog-likes').should('contain', '1'); // Check that the like count increased
            cy.get('#blog-like-button').should('contain', 'Liked').click();
            cy.get('#blog-likes').should('contain', '0'); // Check that the like count decreased
          });
      });

      it('Creator of the blog see the Delete button and delete it', function () {
        cy.get('.blog-parent-div')
          .eq(0)
          .within(() => {
            cy.get('#togglable-show-label-button').click();
            cy.get('#blog-delete-button').should('contain', 'Delete').click();
          });
        cy.on('window:confirm', () => true);
        cy.get('.success')
          .should('be.visible')
          .should('contain', 'Post deleted successfully');
      });
      it('Only Creator of the blog see the Delete button', function () {
        //Confirm creator see the Delete button
        cy.get('.blog-parent-div')
          .eq(0)
          .within(() => {
            cy.get('#togglable-show-label-button').click();
            cy.get('#blog-delete-button').should('be.visible');
          });
        cy.get('#logout-button').click();
        const user2 = {
          name: 'Name Admin2',
          username: 'adminusername2',
          password: 'adminpassword2'
        };
        cy.request('POST', 'http://localhost:3003/api/users/', user2);
        cy.get('#username').should('be.visible').type('adminusername2');
        cy.get('#password').should('be.visible').type('adminpassword2');
        cy.get('#login-button').should('be.visible').click();

        cy.get('.blog-parent-div')
          .eq(0)
          .within(() => {
            cy.get('#togglable-show-label-button').click();
            cy.get('#blog-delete-button').should('not.exist');
          });
      });

      it('blogs are ordered according to likes with the blog with the most likes being first', function () {
        // Create new blog
        cy.get('.blog-parent-div').should('have.length', 1);
        cy.get('#togglable-show-label-button').contains('Create New').click();
        cy.get('#create-form-title').should('be.visible');
        cy.get('#create-form-input-title')
          .should('be.visible')
          .type('new Blog Created');
        cy.get('#create-form-input-author')
          .should('be.visible')
          .type('new Name Author');
        cy.get('#create-form-input-url')
          .should('be.visible')
          .type('https://www.newgoogle.com');
        cy.get('#create-form-create-post-button').click();
        cy.contains('new Blog Created by new Name Author added');
        // message success
        cy.get('.success').should('be.visible');
        cy.get('.blog-parent-div').should('have.length', 2);
        // assert position of blogs in list
        let firstBlog;
        let secondBlog;
        // get name on first blog
        cy.get('.blog-parent-div')
          .eq(0)
          .within(() => {
            cy.get('#blog-titleauthor')
              .invoke('text')
              .then(text => {
                firstBlog = text.trim(); // Save the text into the variable
              });
          });
        console.log(firstBlog);
        // get name on second blog and like it
        cy.get('.blog-parent-div')
          .eq(1)
          .within(() => {
            cy.get('#blog-titleauthor')
              .invoke('text')
              .then(text => {
                secondBlog = text.trim(); // Save the text into the variable
              });
            cy.get('#togglable-show-label-button').click();
            cy.get('#blog-like-button').should('contain', 'Like').click();
            cy.get('#blog-likes').should('contain', '1'); // Check that the like count increased
          });

        // We refresh and check if secondBlog is first
        cy.visit('http://localhost:5173');
        cy.get('.blog-parent-div')
          .eq(0)
          .within(() => {
            cy.get('#blog-titleauthor')
              .invoke('text')
              .then(text => {
                // Sorted by likes
                expect(text.trim()).to.equal(secondBlog);
              });
          });
      });
    });
  });
});
