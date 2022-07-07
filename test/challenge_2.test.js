const chai = require("chai");
const {assert} = chai;
chai.config.truncateThreshold = 0;

describe('Strategy', () => {
  it('Walk Move', () => {
    let viking = new Viking();
    
    viking.move();
    assert.equal(viking.position, 1);
    viking.move();
    assert.equal(viking.position, 2);
  });
  
  it('Fly Move', () => {
    let viking = new Viking();
    viking.moveBehavior = new Fly();
    
    viking.move();
    assert.equal(viking.position, 10);
    viking.move();
    assert.equal(viking.position, 20);
  });
  
  it('Mix Move', () => {
    let viking = new Viking();
    
    viking.move();
    assert.equal(viking.position, 1);
    viking.moveBehavior = new Fly();
    viking.move();
    assert.equal(viking.position, 11);
  });
});