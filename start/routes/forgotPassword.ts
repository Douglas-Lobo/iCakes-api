import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.post('/', 'ForgotPasswordController.store')
  Route.get('/:key', 'ForgotPasswordController.show')
  Route.put('/:key', 'ForgotPasswordController.update')
}).prefix('forgot-password')
