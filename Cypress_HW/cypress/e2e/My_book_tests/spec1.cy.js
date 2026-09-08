describe("Favorites tests", () => {
  it("Should add the book to favorites", () => {
    cy.goToBooks();
    cy.contains("Delete from favorite").click();
    cy.contains("Add to favorite").click();
    cy.contains("Delete from favorite").should("be.visible");
  });

  it("Should delete the book to favorites", () => {
    cy.goToBooks();
    cy.contains("Delete from favorite").click();
    cy.contains("Add to favorite").click();
    cy.contains("Delete from favorite").click();
    cy.contains("Add to favorite").should("be.visible");
  });

  it("'Should not add duplicate to favorite", () => {
    cy.goToBooks();
    
    cy.contains("Add to favorite").click();
    cy.contains('Delete from favorite');
    cy.contains("Favorites").click();
    cy.contains('Please add some book to favorit on home page!').should('be.visible');
  });
});
