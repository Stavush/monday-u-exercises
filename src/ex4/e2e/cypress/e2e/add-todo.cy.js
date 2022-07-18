describe("Add Todo Action", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001");
  });

  it("should add a new todo on button click", () => {
    // TODO: fill this test

    const newItem = "A new item";
    cy.get(".input-component").type(newItem);
    cy.get("#add-todo-button").click();
    cy.get(".ListItemComponent_container__HbBLT").last().should("be.visible");
  });

  it("should add a new todo on enter press", () => {
    // TODO: fill this test

    const newItem2 = "Another new item";
    cy.get(".input-component").type(newItem2).type("{enter}");
    cy.get(".ListItemComponent_text__whseN").last().should("be.visible");
  });
});
