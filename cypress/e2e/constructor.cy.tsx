/// <reference types="cypress" />

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    supportFile: 'cypress/support/e2e.ts'
  }
});

describe('Burger Constructor Flow', () => {
  beforeEach(() => {
    // Мок ингредиентов
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    // Мок данных пользователя
    cy.intercept('GET', '**/auth/user', {
      body: {
        success: true,
        user: {
          email: 'test@example.com',
          name: 'Test User'
        }
      }
    }).as('getUser');

    // Мок заказа
    cy.intercept('POST', '**/orders', {
      statusCode: 200,
      body: {
        success: true,
        name: 'Краторный био-марсианский бургер',
        order: {
          number: 12345
        }
      }
    }).as('postOrder');

    // Токены
    window.localStorage.setItem('accessToken', 'mockAccessToken');
    window.localStorage.setItem('refreshToken', 'mockRefreshToken');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('should add bun and filling to constructor', () => {
    // Перетащить булку
    cy.get('[data-cy=ingredient-card]')
      .contains('Краторная булка N-200i') // или .eq(0)
      .trigger('dragstart');
    cy.get('[data-cy=drop-target]').trigger('drop');

    // Перетащить начинку
    cy.get('[data-cy=ingredient-card]')
      .contains('Соус Spicy-X') // или .eq(3)
      .trigger('dragstart');
    cy.get('[data-cy=drop-target]').trigger('drop');

    // Проверка, что ингредиенты в конструкторе
    cy.get('[data-cy=constructor-item]').should('have.length.at.least', 2);
  });

  it('should open and close ingredient modal', () => {
    cy.get('[data-cy=ingredient-card]').first().click();
    cy.get('[data-cy=modal]').should('exist');

    // Закрытие по кнопке
    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');

    // Повторное открытие и закрытие по overlay
    cy.get('[data-cy=ingredient-card]').first().click();
    cy.get('[data-cy=modal-overlay]').click('topRight');
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('should create order and clear constructor', () => {
    // Добавление булки и ингредиентов
    cy.get('[data-cy=ingredient-card]')
      .contains('Краторная булка N-200i')
      .trigger('dragstart');
    cy.get('[data-cy=drop-target]').trigger('drop');

    cy.get('[data-cy=ingredient-card]')
      .contains('Соус Spicy-X')
      .trigger('dragstart');
    cy.get('[data-cy=drop-target]').trigger('drop');

    // Клик по кнопке "Оформить заказ"
    cy.get('button').contains('Оформить заказ').click();

    // Ожидаем модальное окно заказа
    cy.get('[data-cy=order-modal]').should('exist');
    cy.get('[data-cy=order-modal]').contains('12345');

    // Закрытие модалки
    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=order-modal]').should('not.exist');

    // Конструктор пуст
    cy.get('[data-cy=constructor-item]').should('not.exist');
  });
});
