var Action = require('./../models/action.js')

Action.bulkCreate([
  {name: 'admins/list', description: 'Akcja pozwala na pobranie listy administratorów'},
  {name: 'admins/add', description: 'Akcja pozwala na dodanie administratora'},
  {name: 'admins/info', description: 'Akcja pozwala na pobranie informacji o administratorze'},
  {name: 'admins/edit', description: 'Akcja pozwala na edytowanie uprawnień administratorów'},
  {name: 'admins/delete', description: 'Akcja pozwala na usuwanie administratorów'},
  {name: 'categories/list', description: 'Akcja pozwala na pobranie listy kategorii'},
  {name: 'categories/add', description: 'Akcja pozwala na dodawanie kategorii'},
  {name: 'categories/edit', description: 'Akcja pozwala na edytowanie kategorii'},
  {name: 'categories/delete', description: 'Akcja pozwala na usuwanie kategorii'},
  {name: 'users/list', description: 'Akcja pozwala na pobranie listy użytkowników'},
  {name: 'users/status', description: 'Akcja pozwala na zmianę statusu użytkownika'},
  {name: 'users/delete', description: 'Akcja pozwala na usuwanie użytkownika'},
  {name: 'ads/list', description: 'Akcja pozwala na pobranie listy ogłoszeń'},
  {name: 'ads/status', description: 'Akcja pozwala na zmianę statusu ogłoszenia'},
  {name: 'ads/delete', description: 'Akcja pozwala na usuwanie ogłoszenia'},
  {name: 'permissions/list', description: 'Akcja pozwala na pobranie listy dostępu'},
  {name: 'permissions/info', description: 'Akcja pozwala na pobranie informacji o konkretnym dostępie'},
  {name: 'permissions/add', description: 'Akcja pozwala na dodawanie nowego dostępu'},
  {name: 'permissions/edit', description: 'Akcja pozwala na edycję dostępu'},
  {name: 'permissions/delete', description: 'Akcja pozwala na usuwanie dostępu'},
  {name: 'actions/list', description: 'Akcja pozwala na pobranie listy akcji'},
  {name: 'actions/info', description: 'Akcja pozwala na pobranie informacji o konkretnej akcji'}
])
