import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ObraTipo } from '../../../Models/obra-tipo';
import { ObraTipoService } from '../../Services/obra-tipo.service';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.css']
})
export class TipoComponent implements OnInit {

  isEdit: number;
  obraTipo: ObraTipo;
  tipos: ObraTipo[] = [];

  miFormulario: FormGroup = this.fb.group({
    id: [''],
    nombre: ['', [Validators.required]],
    descripcion: [''],
  });

  constructor(
    private service:ObraTipoService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.obraTipo = new ObraTipo();
    this.isEdit = 0;
   }

  ngOnInit(): void {

    this.service.listar().subscribe(tps => {
      this.tipos = tps;
    });

  }

  guardarOactualizar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      this.toastr.error('Complete los campos correctamente', 'Validación')
      return;
    }
    const formValue = { ...this.miFormulario.value };

    this.obraTipo = formValue;

  // ----- Para actualizr o guardar -----
    
    
    if (this.isEdit) {
      //----- -ACTUALIZAMOS-------
      this.obraTipo.id = this.isEdit;
      this.service.actualizar(this.obraTipo).subscribe(m => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Actualizacion',
          html: "Tipo de obra <strong>" + this.obraTipo.nombre + "</strong> Actualizado con éxito",
          showConfirmButton: true,
          timer: 1200
        }
        );
   
        let itemIndex = this.tipos.findIndex(item => item.id == m.id);
        this.tipos[itemIndex] = m;
  

        this.miFormulario.reset();
        this.obraTipo = new ObraTipo();
        this.isEdit = 0;
     
      });

    } else {
      //----- GUARDAMOS -------
      this.service.agregar(this.obraTipo).subscribe(tip => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro',
          html: "Tipo de obra <strong>" + this.obraTipo.nombre + "</strong> Registrado con éxito",
          showConfirmButton: true,
          timer: 1200
        }
        );
        this.tipos.push(tip);
        this.miFormulario.reset();
        this.obraTipo = new ObraTipo();
      });
  
    }
    
  }

  fijarEdicion(o:ObraTipo) {
    this.obraTipo = o;
    this.miFormulario.patchValue(o);
    this.isEdit = o.id;

  }

  campoNoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }


}
