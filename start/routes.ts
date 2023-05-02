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
  Route.post("register", "AuthController.register");
  Route.post("login", "AuthController.login");
  Route.post("recover-password", "AuthController.recoverPassword");
  Route.post("reset-password", "AuthController.resetPassword");
  Route.post("preview-mail", "MailController.preview");
  Route.post("send-mail", "MailController.send");
  Route.resource('users', 'UsersController');
  Route.resource('activities', 'ActivitiesController');
  Route.resource('entes', 'EntesController');
  Route.resource('estados', 'EstadosController');
  Route.resource('managers-schools', 'ManagersSchoolsController');
  Route.resource('managers-sites', 'ManagersSitesController');
  Route.resource('modules', 'ModulesController');
  Route.resource('modules-roles', 'ModulesRolesController');
  Route.resource('municipios', 'MunicipiosController');
  Route.resource('parents', 'ParentsController');
  Route.resource('parroquias', 'ParroquiasController');
  Route.resource('professions', 'ProfessionsController');
  Route.resource('relationship', 'RelationshipController');
  Route.resource('responsabilities', 'ResponsabilitiesController');
  Route.resource('responsibles-entes', 'ResponsiblesEntesController');
  Route.resource('routes-planned', 'RoutesPlannedController');
  Route.resource('schools', 'Schools');
  Route.resource('sites', 'SitesController');
  Route.resource('students', 'StudentsController');
  Route.resource('type-sites', 'TypeSitesController');
  Route.resource('users-profiles', 'UsersProfilesController');
  Route.resource('users-roles', 'UsersRolesController');
}).prefix("api");
