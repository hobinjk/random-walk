var content = document.getElementById('content');

var item = [
  'sack',
  'apple',
  'potato',
  'leaflet',
  'egg',
  'bottle',
  'garlic clove',
  'sword',
  'lantern',
  'key',
  'wrench',
  'screwdriver',
  'jewel',
  'matchbook',
  'torch',
  'scepter',
  'bell',
  'candle',
  'match',
  'book',
  'emerald',
  'ruby',
  'sapphire',
  'pot of gold',
  'scarab',
  'figurine',
  'bracelet',
  'diamond',
  'knife',
  'stiletto',
  'canary',
  'chalice',
  'sword',
  'tome'
];

var itemAdjectives = [
  'purple',
  'black',
  'burnt',
  'garlic-scented',
  'shadowy',
  'shiny',
  'glowing',
  'burning',
  'dim',
  'poisoned',
  'watery',
  'gold',
  'silver',
  '$gem-encrusted',
  '$metal-plated',
  'dusty',
  'old',
  'ancient',
  'discarded'
];

var actions = [
  {
    name: 'go',
    text: '$move $direction',
    responses: [
      '$location.',
      '$location.',
      '$location.',
      '$location. $view.',
      '$location. $view.',
      '$location. $view.',
      '$location. $view.',
      '$location. $view.',
      '$location. $view...',
      '$location. $view. $view.',
      '$location. $view. $view.',
      '$location. $view. $view...',
      '$location. $view. $view. $view.'
    ]
  },
  {
    name: 'look',
    text: '$look $lastItem',
    responses: [
      '$itemDetail.'
    ]
  },
  // {
  //   name: 'wait',
  //   text: '$wait',
  //   responses: [
  //     '$atmosphere.'
  //   ]
  // }
];

var words = {
  location: ['You are in a $place', 'You enter a $place',
             'You find yourself in a $place'],
  view: [
    'A $item $lies on the $furniture',
    'A $itemAdjective $item $lies on the $furniture',
    'There is a $item on the $furniture',
    'There is a $itemAdjective $item on the $furniture',
    'You see a $itemAdjective $item before you',
    'You see a $item before you'
  ],
  lies: ['lies', 'is', 'glitters', 'shines', 'oozes', 'is balanced'],
  furniture: ['table', 'ground', 'cabinet', 'stump', 'grass', 'dirt', 'floor'],
  cant: ['You can\'t go that way', 'No, don\'t do that', 'It is impossible'],
  place: ['field', 'clearing', 'forest', 'meadow', 'cave', 'swamp', 'city',
          'city square', 'castle'],
  move: ['Walk', 'Stroll', 'Meander', 'Wander'],
  direction: ['north', 'east', 'south', 'west', 'out', 'in', 'left', 'right',
              'up', 'down', 'about', 'around'],
  item: item,
  itemAdjective: itemAdjectives,
  gem: ['ruby', 'sapphire', 'garnet', 'amethyst', 'pearl', 'topaz',
        'malachite', 'jasper', 'quartz', 'peridot', 'sugilite'],
  metal: ['silver', 'gold', 'bronze', 'copper', 'platinum'],
  atmosphere: [
    'Birdsong fills the air',
    'A $temperature $wind $ruffles',
    'A stream burbles just out of sight',
    'The sun $suns',
    'The moon $moons',
    'A $spectacular sunset fills the sky with color',
    '$stillness $envelopes your surroundings',
    'The $chatter of a $city hums in the distance'
  ],
  suns: [
    '$shines overhead',
    'shines down from above',
    'warms your $skin',
    'casts a warm light from above'
  ],
  skin: [
    'skin',
    'face',
    'body'
  ],
  moons: [
    'illuminates the night',
    'shines down from above',
    '$shines alone in the sky',
    '$shines, pale and lonely'
  ],
  shines: [
    'hangs',
    'gleams',
    'shines'
  ],
  temperature: [
    'cold',
    'cool',
    'warm',
    'calm',
    'soothing'
  ],
  wind: [
    'wind',
    'breeze',
    'wind'
  ],
  ruffles: [
    'ruffles your hair',
    'blows past you',
    'caresses your face',
    'tugs at your clothing'
  ],
  spectacular: [
    'spectacular',
    'awe-inspiring',
    'brilliant',
    'majestic'
  ],
  envelopes: [
    'envelopes',
    'covers',
    'cocoons',
    'permeates'
  ],
  stillness: [
    'Stillness',
    'Peace',
    'Calm'
  ],
  chatter: [
    'chatter',
    'bustle',
    'hustle and bustle'
  ],
  city: [
    'city',
    'town',
    'village'
  ],
  wait: [
    'Wait',
    'Stand still',
    'Rest',
    'Stay here',
    'Pause here',
    'Be at peace'
  ],
  look: [
    'Look at the',
    'Inspect the',
    'Gaze at the',
    'Pick up the'
  ],

  itemDetail: [
    'You pick up the $lastItem, holding it close',
    'The $lastItem is $surprisingly $surprisingAdjective',
    'The $lastItem crumbles to dust',
    'The $lastItem $itemIdles',
    'The $lastItem feels $itemFeeling'
  ],
  surprisingly: [
    'surprisingly',
    'unexpectedly'
  ],
  surprisingAdjective: [
    'heavy',
    'light',
    'solid',
    'lustrous',
    'shiny',
    'dull',
    'fragile',
    'simple',
    'ornate'
  ],
  itemIdles: [
    'hums',
    'whirs',
    'pulses',
    'lies still',
    'twists in your hand'
  ],
  itemFeeling: [
    'warm',
    'cold',
    'hot',
    'freezing',
    'dusty',
    'clean',
    'light',
    'full of energy',
    'heavy',
    'expensive',
    'fragile',
    'old',
    'ancient'
  ]
};

function sleep(delay) {
  return new Promise(function(res) {
    setTimeout(res, delay);
  });
}

words.lastItem = [];
var turn = 0;

function doTurn() {
  var action = randomChoice(actions);

  while (action.name === 'look' && words.lastItem.length === 0) {
    action = randomChoice(actions);
  }

  if (action.name === 'go') {
    words.lastItem = [];
  }

  var actionText = fillPlaceholders(action.text);

  var response = randomChoice(action.responses);
  var responseText = fillPlaceholders(response);

  typeOut('action', '>', false).then(function(box) {
    return sleep(2000 + Math.random() * 1000).then(function() {
      return typeOutInBox(box, actionText, true);
    });
  }).then(function() {
    return sleep(750);
  }).then(function() {
    return typeOut('response', responseText, false);
  }).then(function() {
    setTimeout(doTurn, 1000);
  });
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fillPlaceholders(text) {
  while (text.indexOf('$') >= 0) {
    var placeholderStart = text.substr(text.indexOf('$') + 1);
    var placeholder = placeholderStart.match(/^\w+/)[0];
    var placeWords = words[placeholder];
    if (!placeWords) {
      console.warn(placeholder + ' is not fully defined');
    }
    var placedWord = randomChoice(placeWords);
    if (placeholder === 'item' && placedWord) {
      words.lastItem = [placedWord];
    }
    text = text.replace('$' + placeholder, placedWord);
  }
  return text;
}

function typeOut(textClass, text, vary) {
  var textBox = document.createElement('pre');
  textBox.classList.add(textClass);
  content.appendChild(textBox);

  return typeOutInBox(textBox, text, vary);
}

// Pure function to use recursively out of laziness
function typeOutInBox(textBox, text, vary) {
  window.scroll(0, 9001 * 9001);
  if (text.length === 0) {
    return new Promise(function(resolve) {
      resolve(textBox);
    });
  }

  return new Promise(function(resolve, reject) {
    textBox.textContent += text[0];
    setTimeout(function() {
      resolve(textBox);
    }, 75 + (vary ? 1 : 0) * Math.random() * 50);
  }).then(function() {
    return typeOutInBox(textBox, text.substr(1));
  });
}

doTurn();
