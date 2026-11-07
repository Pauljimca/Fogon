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
    id: 'seed-pizza-ninja', rev: 1, lang: 'en', title: 'Pizza ninja', servings: null,
    items: [
      { n: 'flour', g: 240, tsp: 2.6, sb: 1 },
      { n: 'warm water', g: 158, tsp: 4.9 },
      { n: 'olive oil', g: 53, tsp: 4.5 },
      { n: 'salt', g: 8, tsp: 6 },
      { n: 'yeast', g: 7, tsp: 3.1 },
      { n: 'sugar', g: 4, tsp: 4.2 }
    ],
    steps: [
      'Put the salt ({8 g}), sugar ({4 g}), yeast ({7 g}), warm water ({158 g}) and olive oil ({53 g}) in the Ninja. Run on 1 for 10 seconds.',
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
    id: 'seed-cheesecake-basque', rev: 1, lang: 'en', title: 'Cheesecake basque', servings: null,
    items: [
      { n: 'cream cheese', g: 600, sb: 1 },
      { n: 'heavy cream', g: 300, tsp: 4.9 },
      { n: 'white sugar', g: 200, tsp: 4.2 },
      { n: 'egg', g: 200, egg: 1 },
      { n: 'cornstarch (maicena)', g: 25, tsp: 2.7 }
    ],
    steps: [
      'Mix the cream cheese ({600 g}) until smooth.',
      'Add the cream ({300 g}) and mix.',
      'Add the sugar ({200 g}) and mix.',
      'Add the eggs ({200 g}) one at a time, mixing after each.',
      'Add the cornstarch ({25 g}) and mix.',
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
    id: 'seed-cinnamon-focaccia', rev: 1, lang: 'es', title: 'Cinnamon focaccia', servings: null,
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
      'Mezcla la harina ({500 g}), la levadura ({3 g}), la sal ({12 g}), el agua ({400 g}) y el aceite ({14 g}).',
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
    id: 'seed-donuts', rev: 1, lang: 'es', title: 'Donuts', servings: null,
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
      'Mezcla la leche ({300 g}) y la levadura ({7 g}) y espera 5 minutos.',
      'Agrega el azúcar ({55 g}) y los demás líquidos: la mantequilla derretida ({89 g}) y los huevos ({100 g}).',
      'Incorpora la harina ({600 g}) y la sal ({1 g}) y mezcla.'
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
    id: 'seed-chocolate-cake', rev: 1, lang: 'en', title: 'Chocolate cake', servings: null,
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
      'Cream the butter ({282 g}).',
      'Add the powdered sugar ({420 g}) little by little.',
      'Add the cocoa ({64 g}), vanilla and salt.',
      'Add the cream ({75 g}) little by little, mixing.'
    ],
    notes: '',
    check: [
      'Pan size and servings?',
      'Add the batter steps.'
    ]
  }
];
