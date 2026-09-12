describe('User API tests', () => {

  it('Create a new user', () => {
    cy.createUser('Test', 'User').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      expect(response.body.firstName).to.eq('Test');
      expect(response.body.surName).to.eq('User');
    });
  });

  it('Update user', () => {
    cy.createUser('UpName', 'UpSurName').then((createResponse) => {
      const userId = createResponse.body.id;

      cy.updateUser(userId, 'NewName', 'NewSurname').then((response) => {
        expect(response.status).to.eq(200);

        cy.getUser(userId).then((getResponse) => {
          expect(getResponse.body.firstName).to.eq('NewName');
          expect(getResponse.body.surName).to.eq('NewSurname');
        });
      });
    });
  });

  it('Delete user', () => {
    cy.createUser('DelName', 'DelSurname').then((createResponse) => {
      const userId = createResponse.body.id;

      cy.deleteUser(userId).then((response) => {
        expect(response.status).to.eq(200);

        cy.request({
          method: 'GET',
          url: `/users/${userId}`,
          failOnStatusCode: false
        }).then((getResponse) => {
           expect(getResponse.status).to.be.oneOf([400, 404]);
        });
      });
    });
  });

});