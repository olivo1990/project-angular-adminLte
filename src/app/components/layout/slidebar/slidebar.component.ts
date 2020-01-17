import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Menu } from '../../../models/menu';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css']
})
export class SlidebarComponent implements OnInit {

  menu: Menu[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.menu = this.usuarioService.menu;

    console.log(this.menu);
  }

}
