import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute,ParamMap } from '@angular/router';
import { Cliente } from '../cliente.model';

@Component({
selector: 'app-cliente-inserir',
templateUrl: './cliente-inserir.component.html',
styleUrls: ['./cliente-inserir.component.css'],
})

export class ClienteInserirComponent implements OnInit {

    private modo: string = "criar";
    private idCliente: string | null = null;
    public cliente: Cliente | undefined;
    public estaCarregando: boolean=false;


    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has("idCliente")) {
                this.modo = "editar";
                this.idCliente = paramMap.get("idCliente");
                this.estaCarregando=true;
                this.clienteService.getCliente(this.idCliente!).subscribe(dadosCli => {
                    this.estaCarregando=false;
                    this.cliente = {
                    id: dadosCli._id,
                    nome: dadosCli.nome,
                    fone: dadosCli.fone,
                    email: dadosCli.email,
                    senha:dadosCli.senha,
                    especialidade:dadosCli.especialidade,
                    estado:dadosCli.estado,
                    crp:dadosCli.crp

                    };
                    });
                }
                else{
                this.modo = "criar";
                this.idCliente=null;
                }
                });
                }
constructor(public clienteService: ClienteService,public route: ActivatedRoute) {}

onSalvarCliente(form: NgForm) {
    if (form.invalid) {
    return;
    }
    this.estaCarregando=true;
    if (this.modo ==="criar"){
        this.clienteService.adicionarCliente(
    form.value.nome,
    form.value.fone,
    form.value.email,
    form.value.senha,
    form.value.especialidade,
    form.value.estado,
    form.value.crp,
        );
    }else{
        this.clienteService.atualizarCliente(
            this.idCliente!,
            form.value.nome,
            form.value.fone,
            form.value.email,
            form.value.senha,
            form.value.especialidade,
            form.value.estado,
            form.value.crp


        )
    }

    form.resetForm();
    }
    
}
