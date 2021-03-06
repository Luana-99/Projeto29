import { Injectable } from '@angular/core';
import { Cliente } from './cliente.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class ClienteService {
    private clientes: Cliente[] = [];
    private listaClientesAtualizada = new Subject<Cliente[]>();
    clienteService: any;

    onDelete(id: string): void {
        this.clienteService.removerCliente(id);
    }


    getClientes(): void {
        this.httpClient
            .get<{ mensagem: string, clientes: any }>('http://localhost:3000/api/clientes')
            .pipe(map((dados) => {
                return dados.clientes.map((cliente: { _id: any; nome: any; fone: any; email: any;senha:any;especialidade:any;estado:any;crp:any }) => {
                    return {
                        id: cliente._id,
                        nome: cliente.nome,
                        fone: cliente.fone,
                        email: cliente.email,
                        senha:cliente.senha,
                        especialidade:cliente.especialidade,
                        estado:cliente.estado,
                        crp:cliente.crp
                        }
                })
            }))
            .subscribe(
                (clientes) => {
                    this.clientes = clientes;
                    this.listaClientesAtualizada.next([...this.clientes]);
                }
            )
    }

    constructor(private httpClient: HttpClient,private router:Router) {
    }

    adicionarCliente(nome: string, fone: string, email: string,senha: string,especialidade:string,estado:string,crp:string) {
        const cliente: Cliente = {
            id: '',
            nome: nome,
            fone: fone,
            email: email,
            senha: senha,
            especialidade:especialidade,
            estado:estado,
            crp:crp,
            

        };
        this.httpClient.post<{ mensagem: string, id: string }>('http://localhost:3000/api/clientes',
            cliente).subscribe(
                (dados) => {
                    cliente.id = dados.id;
                    this.clientes.push(cliente);
                    this.listaClientesAtualizada.next([...this.clientes]);
                    this.router.navigate(['/lista']);
                }
            )
    }
    getCliente (idCliente: string){
        //return {...this.clientes.find((cli) => cli.id === idCliente)};
        return this.httpClient.get<{_id: string, nome: string, fone: string, email: string,senha: string,especialidade:string,estado:string,crp:string}>(`http://localhost:3000/api/clientes/${idCliente}`);
            
        }

    getListaDeClientesAtualizadaObservable() {
        return this.listaClientesAtualizada.asObservable();
    }
    removerCliente(id: string): void {
        this.httpClient.delete(`http://localhost:3000/api/clientes/${id}`).subscribe(() => {
            this.clientes = this.clientes.filter((cli) => {
                return cli.id !== id
            });
            this.listaClientesAtualizada.next([...this.clientes]);
        });
    }
    atualizarCliente (id: string, nome: string, fone: string, email: string,senha: string,especialidade:string,estado:string,crp:string)
    {
        const cliente: Cliente = { id, nome, fone, email,senha,especialidade,estado,crp};
            this.httpClient.put(`http://localhost:3000/api/clientes/${id}`, cliente)
            .subscribe((res => {
            const copia = [...this.clientes];
            const indice = copia.findIndex (cli => cli.id === cliente.id);
            copia[indice] = cliente;
            this.clientes = copia;
            this.listaClientesAtualizada.next([...this.clientes]);
            this.router.navigate(['/lista'])
            }));
            }}