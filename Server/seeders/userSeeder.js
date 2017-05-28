var User = require('./../models/user.js')
var Admin = require('./../models/admin.js')

// User for admin
User.create({
  email: 'admin1@localhost.com',
  firstName: 'Kot',
  lastName: 'Marek',
  password: 'qwerty',
  status: 1
}).then(function(user) {
  Admin.create({
    userId: user.id,
    permissionId: 1
  })
})

// Static user
User.create({
  email: 'user1@localhost.com',
  firstName: 'Alexander',
  lastName: 'Grothendieck',
  password: 'qwerty',
  status: 1
})

// Extra random users
var first_names = ['Maria', 'Krystyna', 'Anna', 'Barbara', 'Teresa', 'Elżbieta', 'Janina', 'Zofia', 'Jadwiga', 'Danuta', 'Halina', 'Irena', 'Ewa', 'Małgorzata', 'Helena', 'Grażyna', 'Bożena', 'Stanisława', 'Jolanta'];

var last_names = ['Nowak', 'Kowalska', 'Wiśniewska', 'Dąbrowska', 'Lewandowska', 'Wójcik', 'Kamińska', 'Kowalczyk', 'Zielińska', 'Szymańska', 'Woźniak', 'Kozłowska', 'Jankowska', 'Wojciechowska'];

for (i = 0; i < 25; i++) {
  var randomFirstName = first_names[Math.floor(Math.random() * first_names.length)]
  var randomLastName = last_names[Math.floor(Math.random() * last_names.length)]
  var randomServer = Math.floor(Math.random() * 100000);

  var randomUser = {
    email: randomFirstName.toLowerCase() + '@' + randomServer + '.com',
    firstName: randomFirstName,
    lastName: randomLastName,
    password: 'qwerty',
    status: 1
  }

  User.create(randomUser)
}
