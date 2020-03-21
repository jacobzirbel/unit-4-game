game = {
	DOMElements: {
		characterWrapper: $(".characterWrapper"),
		enemyWrapper: $(".enemyWrapper"),
		fighters: $(".fighters"),
		fighter1: $("#fighter1"),
		fighter2: $("#fighter2"),
		fighter3: $("#fighter3"),
		fighter4: $("#fighter4"),
		characterHealth: $("<p>").attr("id", "characterHealth"),
		enemyHealth: $("<p>").attr("id", "enemyHealth"),
		attackButton: $("#attackButton")
	},
	currentCharacter: "",
	currentEnemy: "",
	fighters: [
		{ name: "fighter1", HP: 100, attackPower: 5 },
		{ name: "fighter2", HP: 120, attackPower: 8 },
		{ name: "fighter3", HP: 150, attackPower: 20 },
		{ name: "fighter4", HP: 180, attackPower: 25 }
	],
	reset() {
		setTimeout(() => {
			location.reload();
		}, 1000);
	},
	lose() {
		alert("loser");
		this.reset();
	},
	win() {
		alert("winner");
		this.reset();
	},
	showHealth() {
		if (this.currentCharacter.HP < 1) {
			this.currentCharacter.HP = 0;
			this.DOMElements.characterHealth.text("You Lose");

			this.lose();
		}
		if (this.currentEnemy.HP < 1) {
			this.currentEnemy.HP = 0;
			this.DOMElements.enemyHealth.text("Pick Next Enemy");
			this.DOMElements[this.currentEnemy.name].remove();
			this.currentEnemy = "";
			this.pick();
		}
		this.DOMElements.characterHealth.text(
			"Health: " + this.currentCharacter.HP
		);
		if (this.currentEnemy.HP === undefined) {
			this.DOMElements.enemyHealth.text("Pick Next Enemy");
		} else {
			this.DOMElements.enemyHealth.text("Health: " + this.currentEnemy.HP);
		}
	},
	animateSpell() {
		let spell = $("<div>");
		this.DOMElements[this.currentCharacter.name].append(spell);
		spell.attr("id", "spell");
		spell.css("background-color", "red");
		spell.animate({ right: "100px", opacity: "1" }, "normal", () => {
			this.currentEnemy.HP -= this.currentCharacter.attack();
			this.showHealth();
			if (this.currentEnemy) {
				setTimeout(() => {
					this.animateCounter();
				}, 100);
			}
		});
		spell.animate({ opacity: "0" }, "normal");
	},
	animateCounter() {
		let spell = $("<div>");
		this.DOMElements[this.currentEnemy.name].append(spell);
		spell.attr("id", "spell");
		spell.css("background-color", "green");

		spell.animate({ left: "100px", opacity: "1" }, "normal", () => {
			this.currentCharacter.HP -= this.currentEnemy.attackPower;
			this.showHealth();
			spell.animate({ opacity: "0" }, "normal");
			this.DOMElements.attackButton.prop("disabled", false);
			this.fight();
		});
	},
	fight() {
		this.DOMElements.attackButton.prop("disabled", false);
		this.showHealth();
		this.DOMElements.attackButton.one("click", () => {
			this.DOMElements.attackButton.prop("disabled", true);
			this.animateSpell();
		});
	},
	select(divElement, type) {
		let wrapper = this.DOMElements[type.toLowerCase() + "Wrapper"];
		wrapper.append(divElement);
		this["current" + type] = this.fighters.find(
			e => divElement.attr("id") === e.name
		);
		this.fighters = this.fighters.filter(e => divElement.attr("id") !== e.name);
		this.fighters.forEach(e => {
			if (e === divElement.attr("id")) {
				this["current" + type] = e;
			}
		});
		if (type === "Character") {
			this.currentCharacter.characterAttack = this.currentCharacter.attackPower;
			this.currentCharacter.attack = function() {
				let ret = this.characterAttack;
				this.characterAttack += this.attackPower;
				return ret;
			};
			this.DOMElements.characterWrapper.append(
				this.DOMElements.characterHealth.text(
					"Health:" + this.currentCharacter.HP
				)
			);
		} else {
			this.DOMElements.enemyWrapper.append(
				this.DOMElements.enemyHealth.text("Health: " + this.currentEnemy.HP)
			);
			// if (this.currentEnemy) {
			this.fight();
			// }
		}
	},
	pick() {
		let type = this.currentCharacter ? "Enemy" : "Character";
		if (game.fighters.length === 0) {
			game.win();
		}
		$(".option").on("click", function() {
			$(".option").off();
			$(this).attr("class", `${type.toLowerCase()}Fighter fighter`);
			$(".characterOption").attr("class", "enemyOption option fighter");
			game.select($(this), type);
			if (!game.currentEnemy) {
				game.pick();
			}
		});
	}
};

$(document).ready(() => {
	game.pick();
});
