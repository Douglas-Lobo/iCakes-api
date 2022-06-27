import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.put('/', 'UsersController.update')
  Route.get('/', 'UsersController.show')
  Route.delete('/', 'UsersController.destroy')
}).prefix('users')
