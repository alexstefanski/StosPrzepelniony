var Action = require('./../models/action.js')

Action.bulkCreate([
  {name: 'Dodawanie kategorii', description: 'Akcja pozwala na dodawanie nowych kategorii.'},
  {name: 'Edycja kategorii', description: 'Akcja pozwala na edycje istniejących kategorii.'},
  {name: 'Usuwanie kategorii', description: 'Akcja pozwala na usuwanie istniejących kategorii.'}
])
