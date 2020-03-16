game = {
	DOMElements: {
		youWrapper: $(".youWrapper"),
		enemyWrapper: $(".enemyWrapper"),
		fighters: $(".fighters"),
		fighter1: $("#fighter1"),
		fighter2: $("#fighter2"),
		fighter3: $("#fighter3"),
		fighter4: $("#fighter4")
	},
	currentCharacter: {},
	currentEnemy: {},
	fighters: [
		{ name: "fighter1", HP: 10, attack: 4, counter: 4 },
		{ name: "fighter2", HP: 10, attack: 4, counter: 4 },
		{ name: "fighter3", HP: 10, attack: 4, counter: 4 },
		{ name: "fighter4", HP: 10, attack: 4, counter: 4 }
	],
	testAlert: () => alert("hello"),
	selectFighter(f) {
		f.hide();
		this.DOMElements.youWrapper.append(f);
		f.show();
		this.currentCharacter = this.fighters.find(e => f.attr("id") === e.name);
		this.currentCharacter.increaseAttack = function() {
			this.yourAttack += this.attack;
		};
		this.fighters = this.fighters.filter(e => f.attr("id") !== e.name);
		console.log(this.fighters);
	},
	selectEnemy(f) {
		f.hide();
		this.DOMElements.enemyWrapper.append(f);
		f.show();
		this.currentEnemy = this.fighters.find(e => f.attr("id") === e.name);
		this.fighters = this.fighters.filter(e => f.attr("id") !== e.name);
		console.log(this.fighters);
	},
	pickCharacter() {
		$(".option").on("click", function() {
			$(".option").off();
			$(this).attr("class", "yourFighter fighter");
			console.log(this);
			game.selectFighter($(this));
			game.pickEnemy();
		});
	},
	pickEnemy() {
		$(".option").on("click", function() {
			$(".option").off();
			$(this).attr("class", "enemyFighter fighter");
			console.log(this);
			game.selectEnemy($(this));
		});
	}
};
$(document).ready(() => {
	game.pickCharacter();
});
