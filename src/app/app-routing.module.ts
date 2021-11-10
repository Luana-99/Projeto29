import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteListaComponent } from './clientes/cliente-lista/cliente-lista.component';
import { ClienteInserirComponent } from './clientes/cliente-inserir/cliente-inserir.component';
import { Cadastro } from './cadastro/cliente.component';
import { MenuComponent } from './menu/menu.component';
import { AgendaComponent } from './agenda/agenda.component';
import{InicioComponent} from './inicio/inicio.component'
const routes: Routes = [

{ path: 'login', component: Cadastro },
{path:'inicio',component:InicioComponent},
{ path: 'criar', component: ClienteInserirComponent},
{ path: 'lista', component: ClienteListaComponent },
{ path: 'editar/:idCliente', component: ClienteInserirComponent},
{ path:'menu', component: MenuComponent},
{ path: 'agendar', component: AgendaComponent }


];
@NgModule({
imports: [
RouterModule.forRoot(routes)
],
exports: [
RouterModule
]
})
export class AppRoutingModule{
}