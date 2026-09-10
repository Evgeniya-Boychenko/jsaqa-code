describe('template spec', () => {
  it('Main page', () => {
    cy.visit("/");
    cy.contains("Идём").should("be.visible");
  })
})


