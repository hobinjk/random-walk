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
  'pustulent',
  'virulent',
  'poisoned',
  'watery',
  'gold',
  'silver',
  '$gem-encrusted',
  '$metal-plated',
  'dusty'
];

var peopleAdjectives = [
  'angry',
  'sad',
  'happy',
  'nefarious',
  'evil',
  'good',
  'unhelpful',
  'helpful',
  'shady',
  'hopeful',
  'fuming',
  'malicious',
  'gibbering'
];

var enemies = [
  'thief',
  'cyclops',
  'grue',
  'keystone kop',
  'wizard',
  'dwarf',
  'elf',
  'hobbit',
  'knight',
  'squire',
  'goblin',
  'gnome',
  'zombie'
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
      '$location. $view. $view. $view.',
      '$cant.',
      '$cant!'
    ]
  }
];

var words = {
  location: ['You are in a $place', 'You enter a $place',
             'You find yourself in a $place'],
  view: [
    'A $item $lies on the $furniture',
    'A $itemAdjective $item $lies on the $furniture',
    'You see a $itemAdjective $item before you',
    'You see a $item before you'
  ],
  lies: ['lies', 'is', 'glitters', 'shines', 'oozes', 'is balanced'],
  furniture: ['table', 'ground', 'cabinet', 'stump', 'grass', 'dirt', 'floor'],
  cant: ['You can\'t go that way', 'No, don\'t do that', 'It is impossible'],
  place: ['field', 'clearing', 'forest', 'meadow', 'cave', 'swamp', 'city',
          'city square', 'castle'],
  move: ['go', 'walk', 'run', 'saunter', 'limp'],
  direction: ['north', 'east', 'south', 'west', 'out', 'in', 'left', 'right',
              'up', 'down'],
  item: item,
  itemAdjective: itemAdjectives,
  gem: ['ruby', 'sapphire', 'garnet', 'amethyst', 'pearl', 'topaz',
        'malachite', 'jasper', 'quartz', 'peridot', 'sugilite'],
  metal: ['silver', 'gold', 'bronze', 'copper', 'platinum'],
  enemy: enemies
};
/* 'look at $item',
'look at $furniture',
'attack $enemy' */

function sleep(delay) {
  return new Promise(function(res) {
    setTimeout(res, delay);
  });
}

function doTurn() {
  var action = randomChoice(actions);
  var actionText = fillPlaceholders(action.text);

  var response = randomChoice(action.responses);
  var responseText = fillPlaceholders(response);

  typeOut(actionText + '\n').then(function() {
    return sleep(500);
  }).then(function() {
    return putText(responseText + '\n\n>');
  }).then(function() {
    return sleep(1000);
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
    var placeholder = placeholderStart.match(/^\w+/);
    text = text.replace('$' + placeholder, randomChoice(words[placeholder]));
  }
  return text;
}

function putText(text) {
  return new Promise(function(resolve) {
    content.textContent += text;
    resolve();
  });
}

function typeOut(text) {
  if (text.length === 0) {
    return new Promise(function(resolve) {
      resolve();
    });
  }
  return new Promise(function(resolve, reject) {
    content.textContent += text[0];
    setTimeout(function() {
      resolve();
    }, 50 + Math.random() * 30);
  }).then(function() {
    return typeOut(text.substr(1));
  });
}

doTurn();
