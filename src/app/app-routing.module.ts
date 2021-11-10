import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteListaComponent } from './clientes/cliente-lista/cliente-lista.component';
import { ClienteInserirComponent } from './clientes/cliente-inserir/cliente-inserir.component';
import { Cadastro } from './cadastro/cliente.component';
import { MenuComponent } from './menu/menu.component';
import{InicioComponent} from './inicio/inicio.component'
const routes: Routes = [

{ path: '', component: Cadastro },
{path:'inicio',component:InicioComponent},
{ path: 'criar', component: ClienteInserirComponent},
{ path: 'lista', component: ClienteListaComponent },
{path: 'editar/:idCliente', component: ClienteInserirComponent}


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