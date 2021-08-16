/// <reference types="cypress" />

//GIVEN User is a new  respondent AND is logged out
//WHEN Selecting 'view map and comment' button
//THEN The map is enlarged and option to select 'have your say' is shown on the top right of the page

describe('Commonplace contribute', () => {
    beforeEach(() => { 
        cy.visit('https://qatestproject.commonplace.is/')
})
    it ('Verifymapisvisible', () => {
         
        cy.get('[data-testid=landingPage-mapBtn]')
        .should('exist')
        cy.contains('View map and comment').click()
    
    })
    
    it ('Have Your Say', () => {
        
        //Navigate to 'Have your say' sub domain but remain on the same tab
        cy.get('[data-testid=navigation-commentBtn]').then(function ($a) {
            const href = $a.prop('https://qatestproject.commonplace.is/comment')
            cy.visit('https://qatestproject.commonplace.is/comment')
            cy.url().should('include', 'https://qatestproject.commonplace.is/comment')
          })
    
    })      
          
//GIVEN Have your say' option on top of the page is selected
//WHEN After pinning the location on map, choosing the suitable options on the right and selecting save comment
//THEN User is directed to page to provide their email address  

          describe('Form Completion', function () {
            beforeEach(function () {
             cy.visit('https://qatestproject.commonplace.is/comment')
             })    

    it ('Make contribution and Save Comment', () => {

        //Choose option for 'What are you commenting on' 
        cy.get('ul#whatAreYouCommentingOn')
          .first().click()

        //Choose option for 'What is the problem'
        cy.get('ul#whatIsTheProblem')
          .first().click()

        //'How serious is this problem
        cy.get('[class=rangeslider__handle]').click({ multiple: true, force: true });
        cy.get('[class=rangeslider__handle]').type(
         "{rightarrow}{rightarrow}"
        );

        //How could we make it better
        cy.get('ul#howImprove')
         .first().focus().click()

        //Would you support these changes being made long term?
        cy.get('select.form-control')
         .select('Yes',{force:true})
         .invoke('val')
         .should('eq','Yes')
       
        //Any other comments about this location?
        cy.get('textarea#anyOtherCommentsAboutThisLocation.form-control')
         .type('This is an automated test') 

        //Place Pin on Map
        
          cy.get('[Class*=leaflet-marker-icon]')
          .contains('525px, 461px, 0px')
          .trigger('dragstart', { dataTransfer: new DataTransfer });
    cy.get('[Class*=leaflet-marker-icon]')
          .eq('500px, 273px, 0px')
          .trigger('drop')
          .trigger('dragend');

        //Save comment
        cy.get('[class*=mgn-right]')
        .click()
    
})

})
})