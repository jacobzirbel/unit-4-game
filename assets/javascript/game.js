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
		attackButton: $("<button>")
			.attr("id", "attackButton")
			.text("attack")
	},
	currentCharacter: "",
	currentEnemy: "",
	fighters: [
		{ name: "fighter1", HP: 10, attackPower: 4 },
		{ name: "fighter2", HP: 20, attackPower: 4 },
		{ name: "fighter3", HP: 30, attackPower: 4 },
		{ name: "fighter4", HP: 40, attackPower: 4 }
	],
	pickNum: 0,
	spellNum: 0,
	showHealth() {
		console.log(this);
		this.DOMElements.characterHealth.text(this.currentCharacter.HP);
		this.DOMElements.enemyHealth.text(this.currentEnemy.HP);
	},
	animateSpell() {
		let spell = $("<div>");
		this.DOMElements[this.currentCharacter.name].append(spell);
		spell.attr("id", "spell");
		spell.animate({ right: "100px", opacity: "1" }, "normal", () => {
			this.currentEnemy.HP -= this.currentCharacter.attack();
			this.showHealth();
			setTimeout(() => {
				this.animateCounter();
				this.DOMElements.attackButton.prop("disabled", false);
			}, 1000);
		});
		spell.animate({ opacity: "0" }, "normal");
	},
	animateCounter() {
		let spell = $("<div>");
		this.DOMElements[this.currentEnemy.name].append(spell);
		spell.attr("id", "spell");
		spell.animate({ left: "100px", opacity: "1" }, "normal", () => {
			this.currentCharacter.HP -= this.currentEnemy.attackPower;
			this.showHealth();
			spell.animate({ opacity: "0" }, "normal");
			this.fight();
		});
	},
	fight() {
		this.showHealth();
		this.DOMElements.characterWrapper.append(this.DOMElements.attackButton);
		this.DOMElements.attackButton.one("click", () => {
			this.DOMElements.attackButton.prop("disabled", true);
			this.animateSpell();
		});
	},
	select(f, type) {
		let wrapper = this.DOMElements[type.toLowerCase() + "Wrapper"];
		wrapper.append(f);
		this["current" + type] = this.fighters.find(e => f.attr("id") === e.name);
		this.fighters = this.fighters.filter(e => f.attr("id") !== e.name);
		if (type === "Character") {
			this.currentCharacter.characterAttack = this.currentCharacter.attackPower;
			this.currentCharacter.attack = function() {
				let ret = this.characterAttack;
				this.characterAttack += this.attackPower;
				return ret;
			};
		}
		this.DOMElements.characterWrapper.append(
			this.DOMElements.characterHealth.text(this.currentCharacter.HP)
		);
		this.DOMElements.enemyWrapper.append(
			this.DOMElements.enemyHealth.text(this.currentEnemy.HP)
		);
		if (this.currentEnemy) {
			this.fight();
		}
	},
	pick() {
		if ([0, 1, 2, 3].includes(this.pickNum)) {
			let type = this.pickNum === 0 ? "Character" : "Enemy";
			console.log(type);
			$(".option").on("click", function() {
				$(".option").off();
				$(this).attr("class", `${type.toLowerCase()}Fighter fighter`);
				game.select($(this), type);
				game.pickNum++;
				if (!game.currentEnemy) {
					game.pick();
				}
			});
		} else {
			//winner?
		}
	}
};

$(document).ready(() => {
	game.pick();
});
