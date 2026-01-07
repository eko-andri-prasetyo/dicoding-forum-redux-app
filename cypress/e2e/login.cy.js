/*
Skenario E2E (minimal 1):
1) Pengguna dapat login melalui halaman Login, lalu diarahkan ke halaman Threads dan melihat tombol Logout.

Catatan:
- Test ini menggunakan cy.intercept untuk men-stub response API agar stabil (tidak bergantung pada kondisi server).
*/

describe('Login flow', () => {
  it('should login successfully and show logout button', () => {
    cy.intercept('POST', '**/login', { fixture: 'login_success.json' }).as('login')
    cy.intercept('GET', '**/users', { fixture: 'users.json' }).as('users')
    cy.intercept('GET', '**/threads', { fixture: 'threads.json' }).as('threads')

    cy.visit('/login')

    cy.get('#email').type('cypress@test.com')
    cy.get('#password').type('cypress123')
    cy.contains('button', 'Login').click()

    cy.wait('@login')
    cy.wait('@users')
    cy.wait('@threads')

    cy.location('pathname').should('eq', '/')
    cy.contains('button', 'Logout').should('be.visible')
  })
})
