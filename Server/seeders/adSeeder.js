var Ad = require('./../models/ad.js')
var User = require('./../models/user.js')
var Category = require('./../models/category.js')

var subjects = ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Aliquam a eleifend odio', 'Ut viverra turpis', 'In eget aliquet massa', 'Nam libero erat', 'Ultrices quis nunc eu', 'Sagittis mollis odio', 'Sed congue non orci in imperdiet', 'Nulla facilisi', 'Nulla ornare orci lacus', 'Eget sagittis enim pellentesque et', 'Mauris vel maximus sapien']

var contents = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a eleifend odio, ut viverra turpis. In eget aliquet massa. Nam libero erat, ultrices quis nunc eu, sagittis mollis odio. Sed congue non orci in imperdiet. Nulla facilisi. Nulla ornare orci lacus, eget sagittis enim pellentesque et. Mauris vel maximus sapien.', 'Proin molestie arcu lacus, nec consequat turpis malesuada ut. Vestibulum auctor enim vel urna euismod, eu fringilla nisl sagittis. Nullam felis nunc, sollicitudin sit amet dui sit amet, aliquam aliquet odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed eu suscipit justo, et viverra nibh. Quisque nec justo tristique, pharetra sem eu, gravida libero. In condimentum, sem id malesuada auctor, massa arcu dictum ipsum, non faucibus mi enim vel dui.', 'Duis tincidunt purus sit amet quam pretium pellentesque. Morbi nec eros quis magna auctor dictum vitae non eros. Cras rutrum molestie tincidunt. Nunc auctor, nunc vitae pulvinar lobortis, mauris sem ornare leo, eget dictum nisi urna nec nibh. Fusce vel neque id arcu placerat scelerisque et non ipsum. Mauris a tempor augue, sed bibendum lacus. Sed luctus consequat luctus. Sed interdum, lacus vitae condimentum sodales, felis lorem aliquet sapien, quis maximus sem massa vel tellus. Etiam tincidunt, purus eget consectetur luctus, sapien sapien elementum nulla, non aliquam lorem erat ut ligula.', 'Integer faucibus nulla quis maximus feugiat. Nam at metus mi. Pellentesque in est et massa vehicula lacinia. Cras nec tortor tellus. Donec dapibus mi sed enim dignissim faucibus. Nam nulla lorem, pulvinar id fringilla in, viverra vel nisi. Praesent eget tincidunt ipsum. Duis nec odio mollis, laoreet leo quis, convallis lorem. Integer in aliquam augue. Nullam ullamcorper dolor non est elementum mollis. Cras eu pretium nisi. Phasellus pulvinar in sapien sit amet gravida. Integer tincidunt erat eu tellus condimentum, vel placerat lectus bibendum. Duis ac metus non libero convallis aliquet egestas vel nibh.', 'Nunc sapien odio, sagittis in neque at, fermentum imperdiet sem. Sed eu facilisis turpis. Donec et lacus id magna accumsan scelerisque ut in dui. Phasellus ut dignissim leo. Aliquam luctus justo eu turpis ullamcorper, eget ullamcorper orci finibus. Praesent molestie orci sit amet lectus faucibus, eu venenatis justo scelerisque. Nam dignissim lacus at quam cursus, in dapibus risus aliquet. Fusce nec viverra massa, fermentum pretium urna.']

var costsTotal = [3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]

var costHour = [10, 30, 50, 100, 120, 150, 200, 300]

User.findAll({
  where: {
    status: 1
  }
})
  .then(users => {

    Category.findAll()
      .then(categories => {

        var ads = []

        // Ogłoszenia z ceną za cały projekt
        for (i = 0; i < 30; i++) {
          var ad = {
            userId: users[Math.floor(Math.random()*users.length)].id,
            subject: subjects[Math.floor(Math.random()*subjects.length)],
            content: contents[Math.floor(Math.random()*contents.length)],
            status: 0,
            costTotal: costsTotal[Math.floor(Math.random()*costsTotal.length)],
            categoryId: categories[Math.floor(Math.random()*categories.length)].categoryId
          }
          ads.push(ad)
        }

        // Ogłoszenia ze stawką godzinową
        for (i = 0; i < 30; i++) {
          var ad = {
            userId: users[Math.floor(Math.random()*users.length)].id,
            subject: subjects[Math.floor(Math.random()*subjects.length)],
            content: contents[Math.floor(Math.random()*contents.length)],
            status: 0,
            costHour: costHour[Math.floor(Math.random()*costHour.length)],
            categoryId: categories[Math.floor(Math.random()*categories.length)].categoryId
          }
          ads.push(ad)
        }

        Ad.bulkCreate(ads)

      })
      .catch(error => {
        console.log('Database error: connection is not established or table categories does not exist.')
      })

  })
  .catch(error => {
    console.log('Database error: connection is not established or table users does not exist.')
  })
