import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Autor } from 'src/app/Models/autor';
import { Obra } from 'src/app/Models/obra';
import Swal from 'sweetalert2';
import { AutorService } from '../../Services/autor.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {

  isEdit: number;
  autor: Autor;
  autores: Autor[]=[];


  miFormulario: FormGroup = this.fb.group({
    id: [''],
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    correo: [''],
    activado: [''],
    pagina_web: [''],
    twitter: [''],
  });

  constructor(
    private service:AutorService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.autor = new Autor();
  
    this.isEdit = 0;
   }

  ngOnInit(): void {

    this.spinner.show();
    this.service.listar().subscribe(a => {
      this.autores = a;
      this.spinner.hide();
    });

  }

  guardarOactualizar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      this.toastr.error('Complete los campos correctamente', 'Validación')
      return;
    }
    this.spinner.show();
    const formValue = { ...this.miFormulario.value };

    this.autor = formValue;

  // ----- Para actualizr o guardar -----
    
    
    if (this.isEdit) {
      //----- -ACTUALIZAMOS-------
      this.autor.id = this.isEdit;
      this.service.actualizar(this.autor).subscribe(m => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Actualizacion',
          html: "Autor <strong>" + this.autor.nombres + "</strong> Actualizado con éxito",
          showConfirmButton: true,
          timer: 1200
        }
        );
   
        let itemIndex = this.autores.findIndex(item => item.id == m.id);
        this.autores[itemIndex] = m;
  

        this.miFormulario.reset();
        this.autor = new Autor();
        this.isEdit = 0;

        this.spinner.hide();
     
      });

    } else {
      //----- GUARDAMOS -------
      this.service.agregar(this.autor).subscribe(tip => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro',
          html: "Autor <strong>" + this.autor.nombres + "</strong> Registrado con éxito",
          showConfirmButton: true,
          timer: 1200
        }
        );
        this.autores.push(tip);
        this.miFormulario.reset();
        this.autor = new Autor();
        this.spinner.hide();
      });
  
    }
    
  }

  fijarEdicion(a:Autor) {
    this.autor = a;
    this.miFormulario.patchValue(a);
    this.isEdit = a.id;

  }

  campoNoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

}
