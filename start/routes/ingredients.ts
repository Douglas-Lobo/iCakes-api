import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.get('ingredients', 'IngredientsController.index').middleware(['auth'])
  Route.post('ingredients', 'IngredientsController.store').middleware(['auth'])
  Route.put('ingredients/:id', 'IngredientsController.update').middleware(['auth'])
  Route.delete('ingredients/:id', 'IngredientsController.destroy').middleware(['auth'])
}).prefix('/budgets/:budgetId/')
