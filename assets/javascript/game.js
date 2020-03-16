game = {
	DOMElements: {
		characterWrapper: $(".characterWrapper"),
		enemyWrapper: $(".enemyWrapper"),
		fighters: $(".fighters"),
		fighter1: $("#fighter1"),
		fighter2: $("#fighter2"),
		fighter3: $("#fighter3"),
		fighter4: $("#fighter4")
	},
	currentCharacter: "",
	currentEnemy: "",
	fighters: [
		{ name: "fighter1", HP: 10, attack: 4, counter: 4 },
		{ name: "fighter2", HP: 10, attack: 4, counter: 4 },
		{ name: "fighter3", HP: 10, attack: 4, counter: 4 },
		{ name: "fighter4", HP: 10, attack: 4, counter: 4 }
	],
	pickNum: 0,
	testAlert: () => alert("hello"),
	select(f, type) {
		this.DOMElements[type.toLowerCase() + "Wrapper"].append(f);
		this["current" + type] = this.fighters.find(e => f.attr("id") === e.name);
		this.fighters = this.fighters.filter(e => f.attr("id") !== e.name);
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
		}
	}
};

$(document).ready(() => {
	game.pick();
});
