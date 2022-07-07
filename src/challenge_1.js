    class Tank {
        constructor() {
            this.toTankMode()
        }
        

        toSiegeMode() {
            this.state = new SiegeState;
            this.canMove = this.state.canMove;
            this.damage = this.state.damage;
        }

        toTankMode() {
            this.state = new TankState;
            this.canMove = this.state.canMove;
            this.damage = this.state.damage;
        }
}

class TankState {
    canMove = true;
    damage = 5; 
}

class SiegeState {
    canMove = false;
    damage = 20;
}

// Tank State
let tank = new Tank();
console.log(tank);

//Siege State
tank = new Tank();
console.log(tank);
tank.toSiegeMode();
console.log('Tank goes to Siege Mode!');
console.log(tank);