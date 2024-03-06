/// <reference types="Cypress"> />

const WebURL = "192.168.0.109:8080";
const numberOfCurrencies = 170;
const conversionResult = "700056.6";
const dayjs = require("dayjs");

context("Exchange-rates app", () => {
  describe("General verifications", () => {
    it("Mocks API latest response", () => {
      cy.intercept(
        "GET",
        "https://api.apilayer.com/exchangerates_data/latest",
        {
          fixture: "../fixtures/intercept/latest.json",
        }
      ).as("Get latest");

      cy.visit(WebURL);
    });

    it("Verifies input date has max attribute", () => {
      cy.get("input[type='date']").should(
        "have.attr",
        "max",
        dayjs().format("YYYY-MM-DD")
      );
    });

    it("Makes sure all currencies are available in first select", () => {
      cy.get("select[id='base-currency']")
        .children()
        .should("have.length", numberOfCurrencies);
    });
  });

  describe("Using currency conversion feature", () => {
    it("Completes form", () => {
      cy.get("select[id='from-currency']").select("USD");
      cy.get("select[id='target-currency']").select("ARS");
      cy.get("input[id='amount']").type("2000");
    });

    it("Mocks API conversion response and submits form", () => {
      cy.intercept(
        "GET",
        "https://api.apilayer.com/exchangerates_data/convert?to=ARS&from=USD&amount=2000",
        {
          fixture: "../fixtures/intercept/conversion.json",
        }
      ).as("Get conversion");

      cy.get("button[id='convert']").click();
    });

    it("Makes sure conversion result is correct", () => {
      cy.get("div[id='result']").should("have.text", conversionResult);
    });
  });

  describe("Using of the specific-date-rates feature", () => {
    it("Makes sure the table of currencies is hidden", () => {
      cy.get("div[data-cy='table']").should("not.be.visible");
    });

    it("Completes form", () => {
      cy.get("select[id='base-currency']").select("EUR");
      cy.get("input[type='date']").type("2023-08-22");
    });

    it("Mocks specific-date-rates API response and submits form", () => {
      cy.intercept(
        "GET",
        "https://api.apilayer.com/exchangerates_data/2023-08-22&base=EUR",
        {
          fixture: "../fixtures/intercept/specific-date-rates.json",
        }
      ).as("Get specific-date-rates");

      cy.get("button[id='enter']").click();
    });

    it("Makes sure table container is visible", () => {
      cy.get("div[data-cy='table']").should("be.visible");
    });
  });
});
