import { faker } from "@faker-js/faker";

describe("Create Projetct", () => {
  beforeEach(() => {
    cy.api_deleteProjects();
    cy.login();
  });

  it("sucessfully", () => {
    const project = {
      //essa nomemclatura do "name" é a forma de concatenar um comando JS (faker... dentro do ${}) com uma string (project-). Isso se chama "Template Literals".
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5),
    };

    cy.gui_createProject(project);

    cy.url().should(
      "be.equal",
      `${Cypress.config("baseUrl")}/${Cypress.env("user_name")}/${project.name}`
    );
    cy.contains(project.name).should("be.visible");
    cy.contains(project.description).should("be.visible");
  });
});
