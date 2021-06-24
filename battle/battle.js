class Character {
    constructor(name, strength, spellPower, health, spellCooldown, defenseCooldown) {
        this.name = name,
        this.strength = strength,
        this.spellPower = spellPower,
        this.spellCooldown = spellCooldown,
        this.health = health,
        this.defenseCooldown = defenseCooldown,
        this.defenseUsed = false,
        this.defenseCooldownCounter = 0,
        this.spellCooldownCounter = 0
    }
    // receiveDamage = (enemy, damage) => {
    //     this.health -= damage;
    //     if (this.health > 0) {
    //       return `${this.name} has received ${damage} point(s) of damage from ${enemy.name}. They now have a health of ${this.health}`;
    //     } else {
    //       return `${this.name} has died in act of combat.`;
    //     }
    // };
    physicalAttack = (enemy) => {
        return enemy.receiveDamage(this, Math.floor(Math.random() * this.strength));
    }
    spellAttack = (enemy, round) => {
        if (this.spellCooldownCounter <= round || this.spellCooldownCounter == 0){
            this.spellCooldownCounter = round + this.spellCooldown;
            return enemy.receiveDamage(this, Math.floor(Math.random() * this.strength)+1);
        }
    }
}
class Warrior extends Character {
  spell = () => {
      console.log('Toss Axe');
  }
  receiveDamage = (enemy, damage) => {
      if (this.defenseUsed === true){
          this.health -= damage/2;
          this.defenseUsed = false;
      } else {
          this.health -= damage;
      }
      if (this.health > 0) {
        let warr = this;
         setTimeout(function() {document.querySelector('p').innerText = `${warr.name} has received ${damage} point(s) of damage from ${enemy.name}. Now he has a health of ${warr.health}`;},3000) 
        
          return `${this.name} has received ${damage} point(s) of damage from ${enemy.name}. Now he has a health of ${this.health}`;
      } else {        
        
        setTimeout(function() {document.querySelector('p').innerText = `${warr.name} has died in act of combat.`},3000)
        
        return `${this.name} has died in act of combat.`;
      }
  };
  defense = (round) => {
      if (this.defenseCooldownCounter <= round || this.defenseCooldownCounter == 0){
          this.defenseCooldownCounter = round + this.defenseCooldown;
          this.defenseUsed = true;
         document.querySelector('p').innerText = `Warrior raised shield, he will receive half damage on the next attack`
          return `Warrior raised shield, he will receive half damage on the next attack`
      }
  }
}


class FinalBoss extends Character {
  spell = () => {
      console.log('Siphon Soul')
  }
  receiveDamage = (enemy, damage) => {
      if (this.defenseUsed === true){
          damage = damage/2;
          this.health -= damage;
          this.defenseUsed = false;
      } else {
          this.health -= damage;
      }
      if (damage > 0){
        hurt();
    }
      if (this.health > 0) {
        return `${this.name} has received ${damage} point(s) of damage from ${enemy.name}. He now has a health of ${this.health}`;
      } else {
        return `${this.name} has died in act of combat.`;
      }
  };
  defense = (round) => {
      if (this.defenseCooldownCounter <= round || this.defenseCooldownCounter == 0){
          this.defenseCooldownCounter = round + this.defenseCooldown;
          this.defenseUsed = true;
          return `Final Boss has used Demoralize. He will take half damage in the next round`
      }
  }
}

class Grunt extends Character {
  spell = () => {
      console.log('Scream')
  }
  defense = (round) => {
      if (this.defenseCooldownCounter <= round || this.defenseCooldownCounter == 0){
          this.defenseCooldownCounter = round + this.defenseCooldown;
          this.health += 10;
          document.querySelector('p').innerText = `'Grunt has used heal. His health is now ${this.health}`
          return `'Grunt has used heal. His health is now ${this.health}`
      }
  }
}

class Dragon extends Character {
  spell = () => {
      console.log('Breathe Fire')
  }
  receiveDamage = (enemy, damage) => {
    // document.querySelector("#villian").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
      if (this.defenseUsed === true){
          enemy.health -= damage;
          this.defenseUsed = false;
          document.querySelector('p').innerText = `${enemy.name} has received ${damage} point(s) of damage from their own attack! They now have a health of ${enemy.health}`
          return `${enemy.name} has received ${damage} point(s) of damage from their own attack! They now have a health of ${enemy.health}`
      } else {
          this.health -= damage;
      }
      if (damage > 0){
        hurt();
    }
      if (this.health > 0) {
        document.querySelector('p').innerText =`${this.name} has received ${damage} point(s) of damage from ${enemy.name}. Now he has a health of ${this.health}`
        return `${this.name} has received ${damage} point(s) of damage from ${enemy.name}. Now he has a health of ${this.health}`;
      } else {
        document.querySelector('p').innerText = `${this.name} has died in act of combat.`
        return `${this.name} has died in act of combat.`;
      }
  };
  
  // NEED A COOLDOWN ON BOTH COMBATANTS USING DEFENSE BACK TO BACK
  defense = (round) => {
      if (this.defenseCooldownCounter <= round || this.defenseCooldownCounter == 0){
          this.defenseCooldownCounter = round + this.defenseCooldown;
          this.defenseUsed = true;
          document.querySelector('p').innerText = `Dragon has used Mirror Image. Enemy will take their own damage`
          return `Dragon has used Mirror Image. Enemy will take their own damage`
      }
  }
}


let warrior = new Warrior('Warrior', 12, 6, 130, 2, 2);
let finalBoss = new FinalBoss('Final Boss', 25, 14, 60, 3, 2);
let grunt = new Grunt('Grunt', 12, 5, 30, 1, 3);
let dragon = new Dragon('Dragon', 9, 10, 30, 2, 2);
function fight (hero,enemy) {
let round = 0;
    document.querySelectorAll("#attack-list li").forEach(li => 
        li.addEventListener("click", (event) => doFight(event))
    );
    
    
    function doFight(event){
        console.log(grunt)
        if (hero.health<=0 || enemy.health <=0){
            console.log('Someone has died so will not run anything');
            return
        } 
        console.log(round);
        let playerChoice = event.target.innerText.slice(0,1).toLowerCase();
        if (playerChoice == 'd' && hero.defenseCooldownCounter > round){
            console.log('Cannot use defense because there is a cooldown');
            return;
        } else if (playerChoice == 's' && hero.spellCooldownCounter > round){
            console.log('Cannot use spell because there is a cooldown');
            return;
        } else if (playerChoice !== 's' && playerChoice !== 'd' && playerChoice !== 'a'){
            console.log('Invalid input, please only use a, s, d');
            return;
        }
        switch(playerChoice){
        case 'a':
            console.log(hero.physicalAttack(enemy));
            break;
        case 's':
            console.log(hero.spellAttack(enemy,round));
            break;
        case 'd':
            console.log(hero.defense(round));
            break;
        }
        if (enemy.health <= 0){
            document.removeEventListener('click',doFight);
            return;
        }
        let aiChoice = '';
        while(true){
            aiChoice = Math.floor(Math.random()*3);
            if (aiChoice == 2 && enemy.defenseCooldownCounter > round){
                continue;
            } else if (aiChoice == 1 && enemy.spellCooldownCounter > round){
                continue;
            } else {break;}
        }
        switch(aiChoice){
            case 0:
                console.log(enemy.physicalAttack(hero));
                break;
            case 1:
                let response = enemy.spellAttack(hero,round);
                console.log(response);
                break;
            case 2:
                console.log(enemy.defense(round));
                break;
        }
        if (hero.health>0 && enemy.health >0){
            round++;
        } 
  };
}

let item = document.querySelectorAll('li')
for(let eachItem of item) {

eachItem.addEventListener("mouseover", func, false);
eachItem.addEventListener("mouseout", func1, false);

function func()
{  
   eachItem.setAttribute("style", "background-color:#fff237a1;")
}

function func1()
{  
   eachItem.setAttribute("style", "color:white;")
}

}



window.onload = fight(warrior, dragon);


function hurt(){
    opacity=0 //opacity of image
    var increase=1 //increase opacity indicator
    var decrease=0 //decrease opacity indicator

    function fade(){
    if (opacity<0.6&&increase)
    opacity+=0.05
    else{
    increase=0
    decrease=1
    }
    
    if (opacity>0.3&&decrease)
    opacity-=0.05
    else{
    increase=1
    decrease=0
    }
    
    document.getElementById('villain').style.opacity=opacity
    }
    
    let interval = setInterval(fade,100);
    setTimeout(function(){clearInterval(interval);document.getElementById('villain').style.opacity=1},3000);
}

