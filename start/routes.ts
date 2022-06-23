import Route from '@ioc:Adonis/Core/Route'

Route.resource('recipes', 'RecipesController').apiOnly()
Route.resource('categories', 'CategoriesController').apiOnly()
Route.resource('images', 'ImagesController').apiOnly()
Route.resource('users', 'UsersController')
  .apiOnly()
  .middleware({ '*': ['acl:Admin'] })

//budgets
Route.resource('budgets', 'BudgetsController')
  .apiOnly()
  .middleware({
    store: ['auth'],
    destroy: ['auth'],
    index: ['auth'],
    update: ['auth'],
    show: ['auth'],
  })
Route.group(() => {
  Route.get('/search', 'BudgetsController.search').middleware(['auth'])
  Route.get('/:id/ingredients/count', 'BudgetsController.ingredientsCount').middleware(['auth'])
}).prefix('/budgets')

//ingredients
Route.group(() => {
  Route.get('ingredients', 'IngredientsController.index').middleware(['auth'])
  Route.post('ingredients', 'IngredientsController.store').middleware(['auth'])
  Route.put('ingredients/:id', 'IngredientsController.update').middleware(['auth'])
  Route.delete('ingredients/:id', 'IngredientsController.destroy').middleware(['auth'])
}).prefix('/budgets/:budgetId/')

//auth
Route.group(() => {
  Route.post('/', 'AuthController.store')
  Route.delete('/', 'AuthController.destroy').middleware(['auth'])
  Route.get('/user', 'AuthController.show').middleware(['auth'])
}).prefix('/auth')
