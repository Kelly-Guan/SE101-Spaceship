import Sprite from '../sprite.js';
import Meteor from './meteor.js';
import Vector2 from '../helpers/Vector2.js';
export default class Asteroid extends Sprite {
    constructor(speed, aSpeed, ...args) {
        super(...args);
        /* Constructor params */
        this.process = null;
        /* Other Attributes */
        this.ctx = 'objects';
        this.delete = false; //Once an item needs to be deleted and stop rendering, set to true
        this.size = new Vector2(30, 30);
        this.mass = 5;
        this.gravitySignature = 0;
        this.radius = 15;
        this.hasExploded = false;
        this.speed = speed;
        this.aSpeed = aSpeed;
        this.image = this.game.images['asteroid'];
    }
    initialize(process) {
        this.process = process;
    }
    update() {
        //Add special update code here if needed
        super.update();
    }
    shatter() {
        // Create a bunch of meteors, somewhat randomly.
        this.delete = true;
        // randomly 2-5 meteors
        const numMeteors = Math.floor(2 + Math.random() * 4);
        const spawnLocationAngle = (Math.PI * 2) / numMeteors;
        for (let i = 0; i < numMeteors; i++) {
            // space the meteors evenly around the perimeter of where the asteroid once was
            const posFromCenter = Vector2.right.rotateTo(i * spawnLocationAngle).scale(this.radius * 0.7);
            // generate a random direction and speed for meteor to go
            const velocity = Vector2.right.rotateTo(spawnLocationAngle).scale(1 + 0.7 * Math.random());
            let meteor = new Meteor(velocity, posFromCenter.add(this.pos), this.game);
            if (this.process)
                this.process.spawnDeletableObject(meteor);
            else
                throw Error('Process not defined');
        }
    }
    receiveDamage() {
        // asteroids have 1hp
        this.shatter();
    }
}