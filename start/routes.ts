import Route from '@ioc:Adonis/Core/Route'

Route.resource('recipes', 'RecipesController').apiOnly()
Route.resource('categories', 'CategoriesController').apiOnly()
Route.resource('users', 'UsersController').apiOnly()
Route.resource('images', 'ImagesController').apiOnly()

Route.resource('ingredients', 'IngredientsController').apiOnly()
Route.resource('budgets', 'BudgetsController').apiOnly()
Route.get('budgets/:id/ingredients', 'BudgetsController.ingredients')
