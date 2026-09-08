it("Should open the main page", () => {
cy.visit("localhost:3000");
cy.get('.text-light > .ml-2').should('have.text', "Books list");
cy.contains("Books list").should('be.visible');
});


