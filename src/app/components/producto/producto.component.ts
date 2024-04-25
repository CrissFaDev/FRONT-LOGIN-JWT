import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ProductoService } from 'src/app/service/producto/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

constructor(private productoService: ProductoService){}

productos: Producto[] = [];

  ngOnInit(): void {
    this.listarProducto();
  }

  listarProducto(){
   this.productoService.listProducts().subscribe({
     next: (data) => {
       this.productos = data;
       console.log(this.productos);
     },
     error: (err) => console.log(err),
     complete: () => console.log('Completado')
   })
  }

  deleteProducto(id: number){
    this.productoService.deleteProducts(id).subscribe({
      next: (data) => {
       // console.log(data)
      },
      error: (err) => console.log(err),
      complete: () => {
        this.listarProducto();
      }
    })
    
  }

}


