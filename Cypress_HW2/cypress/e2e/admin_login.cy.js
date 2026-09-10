describe("Admin login", () => {
  it("should login with valid data", () => {
    cy.fixture("login").then((data) => {
      cy.visit("/admin");
      cy.get('[name="email"]').type(data.happyPath.email);
      cy.get('[name="password"]').type(data.happyPath.password);
      cy.get(".login__button").click();
      cy.url().should("include", "/admin");
      cy.contains("Управление залами").should("be.visible");
    });
  });

  it("should not login with invalid data", () => {
    cy.fixture("login").then((data) => {
      cy.visit("/admin");
      cy.get('[name="email"]').type(data.sadPath.email);
      cy.get('[name="password"]').type(data.sadPath.password);
      cy.get(".login__button").click();
      cy.contains("Ошибка авторизации!").should("be.visible");
    });
  });
});
