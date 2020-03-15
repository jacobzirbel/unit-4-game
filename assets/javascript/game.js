game = {
	DOMElements: {
		youWrapper: $(".youWrapper"),
		fighters: $(".fighters"),
		fighter1: $("#fighter1"),
		fighter2: $("#fighter2"),
		fighter3: $("#fighter3"),
		fighter4: $("#fighter4")
	},
	currentCharacter: {},
	currentEnemy: {},
	fighters: {
		F1: { HP: 10, attack: 4, counter: 4 },
		F2: { HP: 10, attack: 4, counter: 4 },
		F3: { HP: 10, attack: 4, counter: 4 },
		F4: { HP: 10, attack: 4, counter: 4 }
	},
	testAlert: () => alert("hello"),
	moveFighter(f) {
		f.hide();
		this.DOMElements.youWrapper.append(f);
		f.show();
	}
};
