describe("Film booking", () => {
  it("should book a ticket for a film from admin panel", () => {
    cy.fixture("login").then((data) => {
      cy.visit("/admin");
      cy.get('[name="email"]').type(data.happyPath.email);
      cy.get('[name="password"]').type(data.happyPath.password);
      cy.get(".login__button").click();
    });

    cy.contains(".conf-step__movie-title", "Ведьмак").then(($element) => {
      const movieName = $element.text();
      cy.wrap(movieName).as("savedMovie");
    });

    cy.visit("/");

    cy.get("@savedMovie").then((name) => {
      cy.contains(".movie__title", name).click();
    });

    cy.contains('.movie-seances__time', '17:00').click();
    cy.get('.buying-scheme__chair.buying-scheme__chair_standart').eq(3).click();
    cy.contains('Забронировать').should("be.visible");
    
  
  });
});
