const chai = require("chai");
const Tank = require('../src/challenge_1').Tank;
const SiegeState = require('../src/challenge_1').SiegeState;
const {assert} = chai;
chai.config.truncateThreshold = 0;

describe('State', () => {
  it('Tank State', () => {
    let tank = new Tank();

    assert.equal(tank.canMove, true);
    assert.equal(tank.damage, 5);
  });

  it('Siege State', () => {
    let tank = new Tank();
    tank.state = new SiegeState();

    assert.equal(tank.canMove, false);
    assert.equal(tank.damage, 20);
  });

  it('Mix State', () => {
    let tank = new Tank();

    assert.equal(tank.canMove, true);
    tank.state = new SiegeState();
    assert.equal(tank.damage, 20);
  });
});