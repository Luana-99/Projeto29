import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PacienteService } from '../paciente.service';
import { ActivatedRoute,ParamMap } from '@angular/router';
import { Paciente } from '../paciente.model';

@Component({
selector: 'app-paciente-inserir',
templateUrl: './paciente-inserir.component.html',
styleUrls: ['./paciente-inserir.component.css'],
})

export class PacienteInserirComponent implements OnInit {

    private modo: string = "criarPaciente";
    private idPaciente: string | null = null;
    public paciente: Paciente | undefined;
    public estaCarregando: boolean=false;


    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has("idPaciente")) {
                this.modo = "editarPaciente";
                this.idPaciente = paramMap.get("idPaciente");
                this.estaCarregando=true;
                this.pacienteService.getpaciente(this.idPaciente!).subscribe(dadosPac => {
                    this.estaCarregando=false;
                    this.paciente = {
                    id: dadosPac._id,
                    nome: dadosPac.nome,
                    fone: dadosPac.fone,
                    email: dadosPac.email,
                    senha:dadosPac.senha,
                    estado:dadosPac.estado,
                    datanasc:dadosPac.datanasc

                    };
                    });
                }
                else{
                this.modo = "criarPaciente";
                this.idPaciente=null;
                }
                });
                }
constructor(public pacienteService: PacienteService,public route: ActivatedRoute) {}

onSalvarPaciente(form: NgForm) {
    if (form.invalid) {
    return;
    }
    this.estaCarregando=true;
    if (this.modo ==="criarPaciente"){
        this.pacienteService.adicionarPaciente(
    form.value.nome,
    form.value.fone,
    form.value.email,
    form.value.senha,
    form.value.estado,
    form.value.datanasc,
        );
    }else{
        this.pacienteService.atualizarPaciente(
            this.idPaciente!,
            form.value.nome,
            form.value.fone,
            form.value.email,
            form.value.senha,
            form.value.estado,
            form.value.datanasc


        )
    }

    form.resetForm();
    }
    
}
