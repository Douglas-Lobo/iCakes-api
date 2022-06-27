import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.post('/', 'RegisterController.store')
  Route.get('/:key', 'RegisterController.show')
  Route.put('/:key', 'RegisterController.update')
}).prefix('register')
