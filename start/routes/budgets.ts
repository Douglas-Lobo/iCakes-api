import Route from '@ioc:Adonis/Core/Route'
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
