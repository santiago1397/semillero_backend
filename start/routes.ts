/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('register', 'AuthController.register')
  Route.post('login', 'AuthController.login')
  Route.post('logout', 'AuthController.logout')
  Route.resource('entes', 'EntesController').apiOnly()
  Route.resource('estados', 'EstadosController').apiOnly()
  Route.resource('municipios', 'MunicipiosController').apiOnly()
  Route.resource('parroquias', 'ParroquiasController').apiOnly()
  Route.post('recover-password', 'AuthController.recoverPassword')
  Route.post('reset-password', 'AuthController.resetPassword')
  Route.get('download', 'RoutesPlannedController.download')
}).prefix('api')

Route.group(() => {
  Route.resource('roles', 'RolesController').apiOnly()
  Route.resource('users', 'UsersController').apiOnly()
  Route.resource('activities', 'ActivitiesController').apiOnly()
  Route.resource('managers-schools', 'ManagersSchoolsController').apiOnly()
  Route.resource('managers-sites', 'ManagersSitesController').apiOnly()
  Route.resource('modules', 'ModulesController').apiOnly()
  Route.resource('parents', 'ParentsController').apiOnly()
  Route.resource('professions', 'ProfessionsController').apiOnly()
  Route.resource('relationship', 'RelationshipController').apiOnly()
  Route.resource('responsabilities', 'ResponsabilitiesController').apiOnly()
  Route.resource('responsibles-entes', 'ResponsiblesEntesController').apiOnly()
  Route.resource('routes-planned', 'RoutesPlannedController').apiOnly()
  Route.resource('schools', 'SchoolsController').apiOnly()
  Route.resource('sites', 'SitesController').apiOnly()
  Route.resource('students', 'StudentsController').apiOnly()
  Route.resource('type-sites', 'TypeSitesController').apiOnly()
  Route.resource('users-profiles', 'UsersProfilesController').apiOnly()
  Route.get('generate-report', 'RoutesPlannedController.report')
  
})
  .prefix('api')
  .middleware(['auth'])
