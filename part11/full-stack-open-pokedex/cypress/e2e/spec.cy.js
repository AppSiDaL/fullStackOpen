describe('Pokedex', function() {
  it('front page can be opened', function() {
    /* eslint-disable no-undef */
    cy.visit('http://localhost:8080')
    /* eslint-disable no-undef */
    cy.contains('ivysaur')
    /* eslint-disable no-undef */
    cy.contains('Pokémon and Pokémon character names are trademarks of Nintendo.')
  })
})