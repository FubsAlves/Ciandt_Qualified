
class Viking {
        constructor() {
            this.toWalkMode()
        }

        position = 0;

        move() {
            this.position += this.moveBehavior.unit;
        }

        toFlyMode() {
            this.moveBehavior = new Fly();
        }

        toWalkMode() {
            this.moveBehavior = new Walk();
        }

}

class Fly {
        unit = 10;
}

class Walk {
        unit = 1;
}

// Walk Move Strategy
console.log('Walk Move Strategy...')
let viking = new Viking();
console.log(viking);
viking.move();
console.log(viking);
viking.move();
console.log(viking);
console.log()

//Fly Move Strategy
console.log('Fly Move Strategy...')
viking = new Viking();
console.log(viking);
viking.toFlyMode();
console.log('Changing Mode to Fly...');
console.log(viking);
viking.move();
console.log(viking);
viking.move();
console.log(viking);

// Mix Move Strategy
console.log('Mix Move Strategy...');
viking = new Viking();
console.log(viking);
viking.move();
console.log(viking);
viking.toFlyMode();
console.log('Changing to Fly Mode...');
console.log(viking);
viking.move();
console.log(viking);


