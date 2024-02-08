import React from 'react'
import { Video } from './Video'

describe('<Video />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Video />)
  })
})