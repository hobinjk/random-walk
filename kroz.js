var content = document.getElementById('content');

var item = [
  'brown sack',
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
  'sword'
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
    responses: ['view', 'view', 'view', 'cant'] // 'cant'
  }
];

var responses = {
  view: ['You are in a $place', 'You enter a $place',
         'You find yourself in a $place'],
  cant: ['You can\'t go that way', 'No, don\'t do that', 'It is impossible']
};

var words = {
  place: ['field', 'clearing', 'forest', 'meadow', 'cave', 'swamp', 'city',
          'city square', 'castle'],
  move: ['go', 'walk', 'run', 'saunter', 'limp'],
  direction: ['north', 'east', 'south', 'west', 'out', 'in', 'left', 'right',
              'up', 'down'],
  item: item,
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

  var possibleResponses = action.responses.map(function(key) {
    return responses[key];
  });
  var response = randomChoice(possibleResponses);
  var responseText = fillPlaceholders(randomChoice(response));

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
    Object.keys(words).forEach(function(placeholder) {
      var fills = words[placeholder];
      while (text.indexOf('$' + placeholder) >= 0) {
        text = text.replace('$' + placeholder, randomChoice(fills));
      }
    });
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
