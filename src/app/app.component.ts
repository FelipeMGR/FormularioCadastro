import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './form/custom-validator';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "./navbar/navbar.component";
import { NgxMaskDirective } from 'ngx-mask';
import { CepService } from './services/cep.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@Component({
  imports: [MatFormFieldModule, CommonModule, ReactiveFormsModule, MatInputModule, NavbarComponent, NgxMaskDirective,FormsModule, HttpClientModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private cepS = inject(CepService);
  title = 'FormularioCadastro';
  public cep!: string;
  endereco = {
    logradouro: '',
    bairro: '',
    cidade: '',
    uf: '',
  };
  erro: string = '';


  public form = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required, CustomValidators.isValidCpf()]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthDate: new FormControl('', [Validators.required]),
    cep: new FormControl('', [Validators.required]),
    logradouro: new FormControl(''),
    bairro: new FormControl(''),
    cidade: new FormControl(''),
    uf: new FormControl(''),
  });

  constructor(private cepService: CepService) {}

  buscarCep() {
    this.erro = '';
    this.cep = this.form.get('cep')?.value!;

    if (this.cep.length === 8) {
      this.cepS.buscarCep(this.cep).subscribe({
        next: (dados) => {
          if (dados.erro) {
            this.erro = 'CEP não encontrado!';
            this.endereco = { logradouro: '', bairro: '', cidade: '', uf: '' };
          } else {
            this.form.patchValue({ // Preenche os campos com os dados
              logradouro: dados.logradouro,
              bairro: dados.bairro,
              cidade: dados.localidade,
              uf: dados.uf,
          });
          }
        },
        error: () => {
          this.erro = 'Erro ao buscar o CEP!';
        },
      });
    } else {
      this.erro = 'Digite um CEP válido!';
    }
  }
}
