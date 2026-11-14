/* Recipes delivered with the app. To change a recipe, edit it and raise its rev by 1.
   To add one, append it with rev: 1 and a new unique id. To remove one, delete it here
   and add its id to SEED_REMOVE. Phones keep their own edits either way. */
/* Paul's first batch of recipes, converted to grams.
   Item fields: n name · g grams (exact estimate) · t text when there are no grams
   tsp grams per teaspoon (spoon guide under 5 g) · pc [grams per piece, one, many]
   egg counted by the egg weight setting · chk needs checking · sb default scale-by
   s = section title.  Steps: {300 g} scales, plain "120 g" does not. */
window.SEED_REMOVE = ['seed-fluffy-pancakes'];
window.SEED_RECIPES = [
  {
    id: 'seed-double-chocolate-cookies', rev: 1, lang: 'en', title: 'Double chocolate cookies', servings: null,
    items: [
      { n: 'butter', g: 90, tsp: 4.7 },
      { n: 'light brown sugar', g: 90, tsp: 4.4 },
      { n: 'white sugar', g: 50, tsp: 4.2 },
      { n: 'egg', g: 50, egg: 1 },
      { n: 'vanilla', t: 'amount?', chk: 1 },
      { n: 'flour (0000)', g: 165, tsp: 2.6, sb: 1 },
      { n: 'unsweetened cocoa', g: 20, tsp: 1.8 },
      { n: 'salt', t: 'amount?', chk: 1 },
      { n: 'baking soda', g: 5, tsp: 4.8 },
      { n: 'chopped chocolate or chocolate chips', g: 120 }
    ],
    steps: [],
    notes: 'Translated from Spanish (Argentine terms): "manteca" = butter, "azúcar rubia" = light brown sugar, "cacao amargo" = unsweetened cocoa.\nFlour 0000 is a fine Argentine flour; all-purpose flour works.',
    check: [
      'How much vanilla?',
      'How much salt? (a pinch?)',
      'Add the steps (mixing, oven temperature and time).',
      'How many cookies does it make? Set it as Servings.'
    ]
  },
  {
    id: 'seed-pickled-red-onions', rev: 1, lang: 'en', title: 'Pickled red onions', servings: null,
    items: [
      { n: 'red onion', g: 200, sb: 1 },
      { n: 'water', g: 150, tsp: 4.9 },
      { n: 'white wine vinegar', g: 100, tsp: 5 },
      { n: 'sugar', g: 20, tsp: 4.2 },
      { n: 'salt', g: 5, tsp: 6 },
      { n: 'mustard seeds', g: 2, tsp: 3.3 },
      { n: 'black peppercorns', g: 2, tsp: 2.9 },
      { n: 'bay leaf', g: 0.2, pc: [0.2, 'bay leaf', 'bay leaves'] }
    ],
    steps: [
      'Thinly slice the red onion.',
      'In a saucepan, bring the water, vinegar, sugar, salt and spices to a boil.',
      'Pour the hot pickling liquid over the onions and let cool.',
      'Refrigerate for at least 2 hours (better overnight).'
    ],
    notes: 'Makes about 300 g (as the card says).\nBest with: tacos, sandwiches, grilled meats, salads, bowls and fattier fish.',
    check: []
  },
  {
    id: 'seed-pickled-cucumbers', rev: 1, lang: 'en', title: 'Pickled cucumbers with dill & garlic', servings: null,
    items: [
      { n: 'baby cucumbers', g: 400, sb: 1 },
      { n: 'water', g: 250, tsp: 4.9 },
      { n: 'white wine vinegar', g: 150, tsp: 5 },
      { n: 'sugar', g: 20, tsp: 4.2 },
      { n: 'salt', g: 10, tsp: 6 },
      { n: 'garlic', g: 15, pc: [5, 'clove', 'cloves'] },
      { n: 'dill (stems + fronds)', g: 10 },
      { n: 'coriander seeds', g: 2, tsp: 1.8 },
      { n: 'black peppercorns', g: 2, tsp: 2.9 }
    ],
    steps: [
      'Slice the cucumbers into even rounds (3–5 mm).',
      'Bring the water, vinegar, sugar, salt and spices to a boil.',
      'Add the garlic and half of the dill.',
      'Pour the hot liquid over the cucumbers, add the rest of the dill and cool.',
      'Refrigerate for at least 4 hours (best overnight).'
    ],
    notes: 'Makes about 500 g (as the card says). Garlic: 3 cloves ≈ 15 g.\nBest with: burgers, grilled fish, fried chicken, roasted vegetables and sandwiches.',
    check: []
  },
  {
    id: 'seed-pickled-cauliflower', rev: 1, lang: 'en', title: 'Pickled cauliflower with turmeric & coriander', servings: null,
    items: [
      { n: 'cauliflower (florets)', g: 400, sb: 1 },
      { n: 'water', g: 300, tsp: 4.9 },
      { n: 'white wine vinegar', g: 150, tsp: 5 },
      { n: 'sugar', g: 20, tsp: 4.2 },
      { n: 'salt', g: 10, tsp: 6 },
      { n: 'turmeric (powder)', g: 3, tsp: 3 },
      { n: 'coriander seeds', g: 4, tsp: 1.8 },
      { n: 'mustard seeds', g: 3, tsp: 3.3 },
      { n: 'bay leaf', g: 0.2, pc: [0.2, 'bay leaf', 'bay leaves'] },
      { n: 'chili (optional)', g: 5 }
    ],
    steps: [
      'Cut the cauliflower into small florets (3–4 cm).',
      'Bring the water, vinegar, sugar, salt and spices to a boil.',
      'Add the cauliflower and simmer for 2–3 minutes (keep it slightly crisp).',
      'Transfer to a jar and pour over the hot liquid.',
      'Cool and refrigerate for at least 6 hours (best overnight).'
    ],
    notes: 'Makes about 500 g (as the card says).\nBest with: grilled meats, curries, cold plates, sandwiches and mezze boards.',
    check: []
  },
  {
    id: 'seed-pickled-beetroot', rev: 1, lang: 'en', title: 'Pickled beetroot with ginger & orange', servings: null,
    items: [
      { n: 'beetroot (cooked)', g: 400, sb: 1 },
      { n: 'water', g: 250, tsp: 4.9 },
      { n: 'red wine vinegar', g: 150, tsp: 5 },
      { n: 'sugar', g: 30, tsp: 4.2 },
      { n: 'salt', g: 8, tsp: 6 },
      { n: 'fresh ginger', g: 20 },
      { n: 'orange zest', g: 6, tsp: 2, pc: [6, 'orange', 'oranges'] },
      { n: 'mustard seeds', g: 3, tsp: 3.3 },
      { n: 'black peppercorns', g: 3, tsp: 2.9 },
      { n: 'bay leaf', g: 0.2, pc: [0.2, 'bay leaf', 'bay leaves'] }
    ],
    steps: [
      'Cook the beetroot until tender, cool, peel and slice (3–5 mm) or cut into wedges.',
      'Bring the water, vinegar, sugar and salt to a boil.',
      'Add the ginger, orange zest and spices, and simmer for 1 minute.',
      'Pour the hot liquid over the beetroot.',
      'Cool and refrigerate for at least 6 hours (best overnight).'
    ],
    notes: 'Makes about 500 g (as the card says). Orange zest: the card says "from 1 orange", about 6 g (estimate).\nBest with: goat cheese, grilled meats, roasted vegetables, salads and open sandwiches.',
    check: []
  },
  {
    id: 'seed-pickled-red-cabbage', rev: 1, lang: 'en', title: 'Pickled red cabbage with apple & cinnamon', servings: null,
    items: [
      { n: 'red cabbage', g: 400, sb: 1 },
      { n: 'water', g: 250, tsp: 4.9 },
      { n: 'apple cider vinegar', g: 150, tsp: 5 },
      { n: 'sugar', g: 30, tsp: 4.2 },
      { n: 'salt', g: 8, tsp: 6 },
      { n: 'apple (firm)', g: 100 },
      { n: 'cinnamon stick', g: 2.6, pc: [2.6, 'stick', 'sticks'] },
      { n: 'cloves (spice)', g: 0.27, pc: [0.09, 'clove', 'cloves'] },
      { n: 'black peppercorns', g: 4, tsp: 2.9 },
      { n: 'mustard seeds', g: 4, tsp: 3.3 },
      { n: 'bay leaf', g: 0.2, pc: [0.2, 'bay leaf', 'bay leaves'] }
    ],
    steps: [
      'Thinly slice the red cabbage.',
      'Bring the water, vinegar, sugar, salt and spices to a boil.',
      'Add the sliced apple and simmer for 1 minute.',
      'Pour the hot liquid over the cabbage and mix.',
      'Cool and refrigerate for at least 6 hours (best overnight).'
    ],
    notes: 'Makes about 500 g (as the card says). Cinnamon stick ≈ 3 g and 3 cloves ≈ under 1 g are estimates; count them rather than weigh.\nBest with: roasted meats, burgers, grain bowls, cheese boards and sandwiches.',
    check: []
  },
  {
    id: 'seed-becky-cinnamon-rolls', rev: 1, lang: 'en', title: "Becky's cinnamon rolls", servings: null,
    items: [
      { s: 'Dough' },
      { n: 'warm milk', g: 250, tsp: 5 },
      { n: 'melted butter', g: 90, tsp: 4.7 },
      { n: 'all-purpose flour', g: 600, tsp: 2.6, sb: 1 },
      { n: 'salt', g: 4, tsp: 6 },
      { n: 'white sugar', g: 125, tsp: 4.2 },
      { n: 'yeast', g: 10, tsp: 3.1 },
      { n: 'vanilla extract', g: 10, tsp: 4.2 },
      { s: 'Filling' },
      { n: 'brown sugar', g: 213, tsp: 4.4 },
      { n: 'cinnamon', g: 10.4, tsp: 2.6 },
      { n: 'nutmeg', g: 2.2, tsp: 2.2 },
      { n: 'melted butter', g: 75.7, tsp: 4.7, chk: 1 },
      { s: 'Frosting' },
      { n: 'cream cheese (Philadelphia)', t: 'amount?', chk: 1 },
      { n: 'butter, soft (room temperature)', g: 56.8, tsp: 4.7, chk: 1 },
      { n: 'icing sugar', g: 60, tsp: 2.5 },
      { n: 'vanilla extract', g: 2.1, tsp: 4.2 },
      { n: 'salt', t: 'amount?', chk: 1 }
    ],
    steps: [],
    notes: "Becky's handwritten recipe.\nDough: Becky's own grams are used. The cup amounts on her note were only a guide and don't match exactly (e.g. ½ cup sugar ≈ 100 g, she wrote 125 g).\nFilling and frosting were converted from cups and spoons, so the grams are estimates. Weigh them the first time.",
    check: [
      'Add the steps (mixing, rising, rolling, baking temperature and time).',
      'No eggs in the dough. Is that right?',
      'Filling and frosting butter say only "1/3" and "1/4": I assumed cups (≈ 76 g and ≈ 57 g).',
      'How much cream cheese for the frosting?',
      'Frosting: is the ½ teaspoon for the vanilla only, or for the salt too?',
      'How many rolls does it make? Set it as Servings.'
    ]
  },
  {
    id: 'seed-fluffy-pancakes-2', rev: 1, lang: 'en', title: 'Fluffy pancakes', servings: null,
    items: [
      { n: 'all-purpose flour', g: 187.5, tsp: 2.6, sb: 1 },
      { n: 'baking powder, aluminum-free', g: 11.5, tsp: 4.6 },
      { n: 'salt', g: 3, tsp: 6 },
      { n: 'sugar', g: 25, tsp: 4.2 },
      { n: 'milk, any', g: 302.5, tsp: 5 },
      { n: 'egg', g: 50, egg: 1 },
      { n: 'butter, melted', g: 42, tsp: 4.7 },
      { n: 'vanilla extract', g: 8.4, tsp: 4.2 }
    ],
    steps: [
      '## Make the batter',
      'In a large bowl, combine the flour, baking powder, salt and sugar.',
      'Make a well (like a volcano) in the middle and pour in the milk, egg, melted butter and vanilla extract.',
      'Break up the egg first with a fork, then mix it with the liquid ingredients, and then combine it with the flour, working from the outside of the bowl in, until just combined and mostly smooth. Stop mixing when you no longer see flour, to avoid chewy pancakes.',
      '## Cook the pancakes',
      'Heat a non-stick griddle or large pan over medium heat. Once hot, grease, spray or melt butter on the hot surface. On an electric griddle, heat it to 150–175 °C. If you grease it with butter and it browns, the surface is too hot.',
      'Immediately pour ¼ cup of batter onto the greased surface. The batter doesn\'t spread, so shape it with the back of a spoon or the scoop. Cook the first side for about 2 minutes, until the edges look defined and bubbles form. Flip and cook the second side a little less. Avoid pressing down with the spatula after flipping; this makes the pancakes dense by removing the air pockets and/or causes the batter to ooze…'
    ],
    notes: 'Converted from cups and spoons, so the grams are estimates. Weigh them the first time, especially the flour.',
    check: [
      'How many pancakes does it make? Set it as Servings.',
      'The last step is cut off at "ooze". Is there more, and are there more steps after it?'
    ]
  },
  {
    id: 'seed-pizza-ninja', rev: 2, lang: 'en', title: 'Pizza ninja', servings: null,
    items: [
      { n: 'flour', g: 240, tsp: 2.6, sb: 1 },
      { n: 'warm water', g: 158, tsp: 4.9 },
      { n: 'olive oil', g: 53, tsp: 4.5 },
      { n: 'salt', g: 8, tsp: 6 },
      { n: 'yeast', g: 7, tsp: 3.1 },
      { n: 'sugar', g: 4, tsp: 4.2 }
    ],
    steps: [
      'Put the salt, sugar, yeast, warm water and olive oil in the Ninja. Run on 1 for 10 seconds.',
      'Add the flour about 120 g at a time, running on 1 until the dough is smooth.'
    ],
    notes: 'The number of pizzas depends on the dish or pan you use.\n"About 120 g at a time" is a batch size for the machine, so it stays the same when you scale.',
    check: [
      'What is "1" on the Ninja (speed or program)?',
      'Add the rise, shaping and baking steps.'
    ]
  },
  {
    id: 'seed-orange-cake', rev: 1, lang: 'es', title: 'Orange cake', servings: null,
    items: [
      { n: 'azúcar', g: 300, tsp: 4.2 },
      { n: 'ralladura de naranja', g: 12, tsp: 2, pc: [6, 'naranja', 'naranjas'] },
      { n: 'mantequilla', g: 170, tsp: 4.7 },
      { n: 'aceite', g: 45, tsp: 4.5 },
      { n: 'huevo', g: 150, egg: 1 },
      { n: 'jugo de naranja', g: 62, tsp: 5, pc: [65, 'naranja', 'naranjas'] },
      { n: 'harina', g: 280, tsp: 2.6, sb: 1 },
      { n: 'polvo de hornear', g: 15, tsp: 4.6 },
      { n: 'sal', t: '1 pizca (menos de 1 g)' },
      { n: 'leche', g: 90, tsp: 5 },
      { n: 'whiskey', g: 35, tsp: 4.6 }
    ],
    steps: [
      'Mezcla el azúcar ({300 g}) con la ralladura de naranja ({12 g}) hasta integrar bien.',
      'Agrega la mantequilla ({170 g}) y mezcla bien.',
      'Agrega el aceite ({45 g}) y mezcla bien.',
      'Agrega los huevos ({150 g}) y mezcla bien.',
      'Agrega el jugo de naranja ({62 g}) y mezcla bien.',
      'Aparte, combina la harina ({280 g}), el polvo de hornear ({15 g}) y la sal.',
      'Agrega los secos en dos tandas.',
      'Agrega la leche ({90 g}) y el whiskey ({35 g}) y mezcla todo.',
      'Hornea a 160 °C de 50 a 60 minutos.'
    ],
    notes: '"15 de polvo de hornear" y "whiskey 35" no tenían unidad: los leí como gramos.\nRalladura: 2 cdas ≈ 12 g. Pésala la primera vez y corrige el número.\nSi escalas, usa un molde del tamaño de la mezcla; el tiempo cambia.',
    check: [
      'Mide tu molde y anótalo en Notas (y las porciones, si quieres).',
      '¿Mantequilla blanda o derretida?',
      '¿Engrasas o forras el molde?'
    ]
  },
  {
    id: 'seed-chicken-salt', rev: 1, lang: 'en', title: 'Chicken salt', servings: null,
    items: [
      { n: 'salt', g: 40, tsp: 6, sb: 1 },
      { n: 'garlic powder', g: 12, tsp: 3.1 },
      { n: 'smoked paprika (ideally)', g: 7, tsp: 2.3 },
      { n: 'sumac', g: 2, tsp: 2.7 },
      { n: 'ground coriander', g: 1.5, tsp: 2 },
      { n: 'white pepper', g: 1.8, tsp: 2.4 },
      { n: 'onion powder', g: 1.8, tsp: 2.4 }
    ],
    steps: [],
    notes: 'At this batch size the ¾ tsp spoon guide is more accurate than a 1 g scale. For a bigger jar, scale by total weight (e.g. 250 g) and the small spices become easy to weigh.',
    check: []
  },
  {
    id: 'seed-cheesecake-basque', rev: 2, lang: 'en', title: 'Cheesecake basque', servings: null,
    items: [
      { n: 'cream cheese', g: 600, sb: 1 },
      { n: 'heavy cream', g: 300, tsp: 4.9 },
      { n: 'white sugar', g: 200, tsp: 4.2 },
      { n: 'egg', g: 200, egg: 1 },
      { n: 'cornstarch (maicena)', g: 25, tsp: 2.7 }
    ],
    steps: [
      'Mix the cream cheese until smooth.',
      'Add the cream and mix.',
      'Add the sugar and mix.',
      'Add the eggs one at a time, mixing after each.',
      'Add the cornstarch and mix.',
      'Preheat the oven to 225 °C, top and bottom heat, for 10 minutes.',
      'Bake 35–40 minutes. Watch the color, and cover the top if it darkens too fast.',
      'Turn off the oven and leave the cake inside with the door open for 15 minutes.',
      'Let it cool completely, then refrigerate for at least 6 hours.'
    ],
    notes: 'Time and temperature are for your usual mold. If you scale, use a mold sized to the batter.',
    check: [
      'Measure your mold and add the size to Notes. Do you line it with parchment?'
    ]
  },
  {
    id: 'seed-sourdough', rev: 1, lang: 'en', title: 'Sourdough bread', servings: 3, servingsLabel: 'loaves',
    items: [
      { n: 'strong bread flour', g: 425, tsp: 2.6, sb: 1 },
      { n: 'lukewarm water', g: 325, tsp: 4.9 },
      { n: 'olive oil', g: 46, tsp: 4.5 },
      { n: 'salt', g: 10, tsp: 6 },
      { n: 'fast-action yeast', g: 3, tsp: 3.1 }
    ],
    steps: [],
    notes: 'Made with yeast only, no starter.\n325 ml water = 325 g. 50 ml olive oil ≈ 46 g.',
    check: [
      'Makes about 3 loaves (from memory). Confirm next time you bake it.',
      'Add the steps (rise times, oven temperature).'
    ]
  },
  {
    id: 'seed-empanada', rev: 1, lang: 'es', title: 'La masa de empanada perfecta', servings: null,
    items: [
      { n: 'harina común', g: 300, tsp: 2.6, sb: 1 },
      { n: 'agua caliente (sin que queme)', g: 130, tsp: 4.9 },
      { n: 'manteca o mantequilla', g: 45, tsp: 4.7 },
      { n: 'sal', g: 5, tsp: 6 }
    ],
    steps: [],
    notes: 'La cantidad de empanadas depende del tamaño.',
    check: [
      'Pesa la masa de una empanada de las que hacen en casa y anótalo en Notas.',
      '¿Usas manteca (de cerdo) o mantequilla?',
      'Agregar los pasos.'
    ]
  },
  {
    id: 'seed-brownies', rev: 1, lang: 'en', title: 'Brownies', servings: null,
    items: [
      { n: 'butter', g: 250, tsp: 4.7, sb: 1 },
      { n: 'powdered milk', g: 32, tsp: 2.5 },
      { n: 'dark chocolate (milk chocolate works too)', g: 170 },
      { n: 'cocoa powder', g: 43, tsp: 2.6 },
      { n: 'oil', g: 41, tsp: 4.5 },
      { n: 'brown sugar', g: 105, tsp: 4.4 },
      { n: 'egg', g: 150, egg: 1 },
      { n: 'powdered sugar', g: 120, tsp: 2.5 },
      { n: 'vanilla', t: 'amount?', chk: 1 },
      { n: 'flour', g: 63, tsp: 2.6 },
      { n: 'salt', t: '1 pinch (under 1 g)' },
      { n: 'chips', t: 'amount?', chk: 1 }
    ],
    steps: [
      'Melt the butter ({250 g}), add the powdered milk ({32 g}) and cook until lightly browned.',
      'Add the chocolate ({170 g}) and stir until melted.',
      'Add the cocoa powder ({43 g}).',
      'Add the oil ({41 g}).',
      'In a separate bowl, mix the brown sugar ({105 g}) and eggs ({150 g}) until the sugar dissolves.',
      'Add the powdered sugar ({120 g}), mix, then add the vanilla.',
      'Add the butter and chocolate mixture.',
      'Add the flour ({63 g}) and the salt.',
      'Add the chips.',
      'Pour into a square pan and bake at 175 °C (350 °F) for about 30 minutes.'
    ],
    notes: 'Cocoa, sugars and flour were converted from cups, so they are estimates. Cocoa varies most (½ cup = 40–50 g).',
    check: [
      'Are the 170 g of chocolate and the "chips" the same? If not, how many grams of chips?',
      'How much vanilla?',
      'Pan size, and how many pieces?'
    ]
  },
  {
    id: 'seed-cinnamon-focaccia', rev: 2, lang: 'es', title: 'Cinnamon focaccia', servings: null,
    items: [
      { s: 'Masa' },
      { n: 'harina', g: 500, tsp: 2.6, sb: 1 },
      { n: 'agua fría', g: 400, tsp: 4.9 },
      { n: 'aceite', g: 14, tsp: 4.5 },
      { n: 'sal', g: 12, tsp: 6 },
      { n: 'levadura fresca', g: 3 },
      { s: 'Cobertura' },
      { n: 'mantequilla derretida', t: 'al gusto' },
      { n: 'canela', t: 'al gusto' },
      { n: 'azúcar morena', t: 'al gusto' },
      { n: 'glaseado', t: '¿receta?', chk: 1 }
    ],
    steps: [
      'Mezcla la harina, la levadura, la sal, el agua y el aceite.',
      'Deja reposar 1 hora.',
      'Haz 4 o 5 pliegues y refrigera 24 horas.',
      'Engrasa la bandeja con mantequilla derretida y pon la masa. Agrega más mantequilla derretida encima.',
      'Espolvorea canela y azúcar morena.',
      'Mezcla.',
      'Estira la masa y agrega más canela y azúcar.',
      'Hornea. ⚠️',
      'Cubre con el glaseado.'
    ],
    notes: 'Levadura fresca: si usas levadura seca instantánea, el equivalente es ≈ 1 g (⅓ cdta).',
    check: [
      'Horno: ¿temperatura y tiempo?',
      '¿Receta del glaseado?',
      '¿Tamaño de la bandeja y cuántos pedazos?'
    ]
  },
  {
    id: 'seed-donuts', rev: 2, lang: 'es', title: 'Donuts', servings: null,
    items: [
      { n: 'harina', g: 600, tsp: 2.6, sb: 1 },
      { n: 'leche tibia', g: 300, tsp: 5 },
      { n: 'huevo', g: 100, egg: 1 },
      { n: 'mantequilla derretida', g: 89, tsp: 4.7 },
      { n: 'azúcar', g: 55, tsp: 4.2 },
      { n: 'levadura', g: 7, tsp: 3.1 },
      { n: 'sal', g: 1, tsp: 6, chk: 1 }
    ],
    steps: [
      'Mezcla la leche y la levadura y espera 5 minutos.',
      'Agrega el azúcar y los demás líquidos: la mantequilla derretida y los huevos.',
      'Incorpora la harina y la sal y mezcla.'
    ],
    notes: 'Leche: 1¼ tazas ≈ 300 g.',
    check: [
      '¿1 g de sal es correcto? Para 600 g de harina lo normal es 6–12 g. ¿Será 10 g?',
      'Faltan pasos: amasado, levado, formado, fritura y cobertura.',
      '¿Cuántos donuts salen?'
    ]
  },
  {
    id: 'seed-ciabatta', rev: 1, lang: 'es', title: 'Ciabatta', servings: null,
    items: [
      { n: 'harina', g: 450, tsp: 2.6, sb: 1 },
      { n: 'agua', g: 300, tsp: 4.9 },
      { n: 'aceite de oliva', g: 46, tsp: 4.5 },
      { n: 'sal', g: 10, tsp: 6 },
      { n: 'levadura', g: 5, tsp: 3.1 }
    ],
    steps: [
      'Mezcla todo.',
      'Deja reposar 30 minutos y haz un pliegue. Repite hasta completar 4 o 5 pliegues.'
    ],
    notes: '300 ml de agua = 300 g. 50 ml de aceite ≈ 46 g.',
    check: [
      'Horno: ¿temperatura y tiempo? ¿Cuántos panes?'
    ]
  },
  {
    id: 'seed-chocolate-cake', rev: 2, lang: 'en', title: 'Chocolate cake', servings: null,
    items: [
      { s: 'Batter' },
      { n: 'flour', g: 219, tsp: 2.6, sb: 1 },
      { n: 'cocoa', g: 70, tsp: 2.6 },
      { n: 'sugar', g: 320, tsp: 4.2 },
      { n: 'baking soda', g: 15, tsp: 4.8 },
      { n: 'baking powder', g: 20, tsp: 4.6 },
      { n: 'salt', g: 10, tsp: 6 },
      { n: 'Nescafé', g: 2, tsp: 1 },
      { n: 'oil', g: 120, tsp: 4.5 },
      { n: 'egg (large)', g: 100, egg: 1 },
      { n: 'vanilla', g: 8.4, tsp: 4.2 },
      { n: 'buttermilk', g: 240, tsp: 5 },
      { n: 'hot coffee', g: 240, tsp: 4.9 },
      { s: 'Buttercream' },
      { n: 'butter, softened', g: 282, tsp: 4.7 },
      { n: 'powdered sugar', g: 420, tsp: 2.5 },
      { n: 'cocoa', g: 64, tsp: 2.6 },
      { n: 'vanilla', g: 4.2, tsp: 4.2 },
      { n: 'salt', g: 1.5, tsp: 6 },
      { n: 'heavy cream', g: 75, tsp: 4.9 }
    ],
    steps: [
      '## Batter',
      'Preheat the oven to 170 °C and bake about 45 minutes, checking by eye.',
      '## Buttercream',
      'Cream the butter.',
      'Add the powdered sugar little by little.',
      'Add the cocoa, vanilla and salt.',
      'Add the cream little by little, mixing.'
    ],
    notes: '',
    check: [
      'Pan size and servings?',
      'Add the batter steps.'
    ]
  }
];
