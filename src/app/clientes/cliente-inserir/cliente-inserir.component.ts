import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,NgForm,Validators } from '@angular/forms';
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
    form!: FormGroup;


    ngOnInit() {
        this.form = new FormGroup({
            nome: new FormControl (null, {
            validators: [Validators.required, Validators.minLength(3)]
            }),
            fone: new FormControl (null, {
            validators: [Validators.required]
            }),
            email: new FormControl (null, {
            validators: [Validators.required, Validators.email]
            }),
            senha:new FormControl(null,{
                validators:[Validators.required,Validators.minLength(6)]
            }),
            especialidade:new FormControl(null,{
                validators:[Validators.required]
            }),
            crp:new FormControl(null,{
                validators:[Validators.required]
            })
            })
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
                    this.form.setValue({
                        nome: this.cliente.nome,
                        fone: this.cliente.fone,
                        email: this.cliente.email,
                        senha:this.cliente.senha,
                        especialidade:this.cliente.especialidade,
                        estado:this.cliente.estado,
                        crp:this.cliente.crp
                        })
                        
                    });
                }
                else{
                this.modo = "criar";
                this.idCliente=null;
                }
                });
                }
constructor(public clienteService: ClienteService,public route: ActivatedRoute) {}

onSalvarCliente() {
    if (this.form.invalid) {
    return;
    }
    this.estaCarregando=true;
    if (this.modo ==="criar"){
        this.clienteService.adicionarCliente(
    this.form.value.nome,
    this.form.value.fone,
    this.form.value.email,
    this.form.value.senha,
    this.form.value.especialidade,
    this.form.value.estado,
    this.form.value.crp,
        );
    }else{
        this.clienteService.atualizarCliente(
            this.idCliente!,
            this.form.value.nome,
            this.form.value.fone,
            this.form.value.email,
            this.form.value.senha,
            this.form.value.especialidade,
            this.form.value.estado,
            this.form.value.crp


        )
    }

    this.form.reset();
    }
    
}
