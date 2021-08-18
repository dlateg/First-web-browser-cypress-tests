/// <reference types="cypress" />

//GIVEN User is a new  respondent AND is logged out
//WHEN Selecting 'view map and comment' button
//THEN The map is enlarged and option to select 'have your say' is shown on the top right of the page

describe('Commonplace contribute', () => {
  before(() => { 
      cy.visit('https://qatestproject.commonplace.is/')

})
  it ('Verifymapisvisible', () => {
       
      cy.get('[data-testid=landingPage-mapBtn]')
      .should('exist')
      cy.contains('View map and comment').click()
  
  })
  
  it ('Have Your Say', () => {
      
      //Navigate to 'Have your say' page without opening new tab
      cy.get('[data-testid=navigation-commentBtn]').then(function ($a) {
          const href = $a.prop('https://qatestproject.commonplace.is/comment')
          cy.visit('https://qatestproject.commonplace.is/comment')
          cy.url().should('include', 'https://qatestproject.commonplace.is/comment')
        })
  
  })      
        
//GIVEN Have your say' option on top of the page is selected
//WHEN After pinning the location on map, choosing the suitable options on the right and selecting save comment
//THEN User is directed to page to provide their email address  

        describe('Contribute', function () {
          before(() => { 
           cy.visit('https://qatestproject.commonplace.is/comment')
         
           })    

  it ('Select location on map', () => {

     
     cy.get('.leaflet-marker-icon')
      .trigger('mouseover')
      .trigger('mousedown', {which: 1})
      .trigger('mousemove', {clientX: 505, clientY: 357})
     cy.get('#map')
      .trigger('mousemove')
      .trigger('mousemove')
      .trigger('mouseup', {force: true})
  })

  it ('What are you commenting on', () => {
       
      cy.get('ul#whatAreYouCommentingOn')
        .first().click()
  })

  it ('What is the problem', () => {
      
      cy.get('ul#whatIsTheProblem')
        .first().click()

  })

  it ('How serious is the problem', () => {
    
      cy.get('[class=rangeslider__handle]').click({ multiple: true, force: true });
      cy.get('[class=rangeslider__handle]').type(
       "{rightarrow}{rightarrow}"
      );
      
  })

  it ('How could we make it better', () => {

      cy.get('ul#howImprove')
       .first().focus().click()

  })

  it ('Would you support these changes being made long term?', () => {

      cy.get('select.form-control')
       .select('Yes',{force:true})
       .invoke('val')
       .should('eq','Yes')
  })

  it ('Any other comments about this location?', () => {
  
      cy.get('textarea#anyOtherCommentsAboutThisLocation.form-control')
       .type('This is an automated test') 

      })

      it ('Save comment', () => {
        cy.get('[class*=mgn-right]').invoke('removeAttr','https://qatestproject.commonplace.is/email')
      .click()
    
    })
      
//GIVEN I am on the provide email address page
//WHEN Entering a valid email address in the email field and selecting next
//THEN User is directed to 'Introduction to the team' page

 it ('Provide email address', () => {

  cy.get('#email').type('whatever@mailinator.com')
  cy.get('[class*=btn-primary]').should('be.enabled').click()


 })
})
})


