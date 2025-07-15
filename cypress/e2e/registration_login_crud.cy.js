describe("Registration Flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("allows a user to register", () => {
    const uniqueUser = `e2euser_${Date.now()}`;
    cy.get('input[name="username"]').type(uniqueUser);
    cy.get('input[name="email"]').type(`${uniqueUser}@example.com`);
    cy.get('input[name="password"]').type("password123");
    cy.contains("Register").click();
    cy.contains("Registration successful!", { timeout: 5000 }).should(
      "be.visible"
    );
  });

  it("shows validation errors for empty registration fields", () => {
    cy.contains("Register").click();
    cy.contains("Username is required").should("be.visible");
    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");
  });
});
