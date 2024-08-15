/// <reference types="cypress" />

describe('Canvas Interaction', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173'); 
  });

  it('should generate squares and draw them on the canvas', () => {
    cy.get('#squareCount').clear().type('10');
    cy.get('#generateBtn').click();

    cy.get('canvas').then(canvas => {
      const ctx = (canvas[0] as HTMLCanvasElement).getContext('2d');
      expect(ctx).to.exist;

      const canvasWidth = canvas.width();
      const canvasHeight = canvas.height();

      if(!canvasWidth || !canvasHeight) {
        return;
      }
      
      const imageData = ctx!.getImageData(0, 0, canvasWidth, canvasHeight).data;
      const hasNonTransparentPixels = imageData.some(value => value !== 0);
      expect(hasNonTransparentPixels).to.be.true;
    });
  });

  it('should detect click on square and change its color', () => {
    cy.get('#squareCount').clear().type('1');
    cy.get('#generateBtn').click();

    cy.get('canvas').then(canvas => {
      const rect = canvas[0].getBoundingClientRect();
      const clickX = 50;  
      const clickY = 50;

      const canvasWidth = canvas.width();
      const canvasHeight = canvas.height();

      if(!canvasWidth || !canvasHeight) {
        return;
      }

      const relativeClickX = rect.left + clickX;
      const relativeClickY = rect.top + clickY;
      const ctx = (canvas[0] as HTMLCanvasElement).getContext('2d');

      const imageData = ctx!.getImageData(0, 0, canvasWidth, canvasHeight).data;
      const box = imageData.findIndex(value => value !== 0);

      const pixelIndex = Math.floor(box / 4);
      const posX = pixelIndex % canvasWidth;
      const posY = Math.floor(pixelIndex / canvasWidth);
      const pixelDataBefore = ctx!.getImageData(posX, posY, 1, 1).data;

      expect(pixelDataBefore[3]).to.be.greaterThan(0); 


      cy.get('canvas').click(relativeClickX, relativeClickY);


      const pixelDataAfter = ctx!.getImageData(clickX, clickY, 1, 1).data;


      expect(pixelDataAfter[0]).to.not.equal(pixelDataBefore[0]);
      expect(pixelDataAfter[1]).to.not.equal(pixelDataBefore[1]); 
      expect(pixelDataAfter[2]).to.not.equal(pixelDataBefore[2]); 
    });
  });
});
