import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { Subscription, Observable } from 'rxjs';
@Component({
selector: 'app-cliente-lista',
templateUrl: './cliente-lista.component.html',
styleUrls: ['./cliente-lista.component.css'],
})
export class ClienteListaComponent implements OnInit, OnDestroy {
clientes: Cliente[] = [];
clientesSubscription: Subscription = new Subscription;
constructor(public clienteService: ClienteService) {}
onDelete (id: string): void{
    this.clienteService.removerCliente(id);
    }

  ngOnInit(): void {
    this.clienteService.getClientes();
    this.clientesSubscription = this.clienteService
.getListaDeClientesAtualizadaObservable()
.subscribe((clientes: Cliente[]) => {
this.clientes = clientes;
});
  }

  ngOnDestroy(): void {
    this.clientesSubscription.unsubscribe();
    }
}