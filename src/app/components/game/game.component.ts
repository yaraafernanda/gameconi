import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { User } from 'src/app/class/User';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(private modalService: NgbModal,private usuarioService:UsuarioService) { }
  actualPage:number = 1;
  closeResult: string;
  users:User[];
  searchbox_select_rival:string;
  userChangeSub: Subscription;
  userSelected:User;
  ngOnInit() {
    if(this.usuarioService.getUsers()){
      this.users=this.usuarioService.getUsers();
    }else{
      this.userChangeSub = this.usuarioService.usersChange.subscribe(
        (arregloUsuarios:User[])=>{
          console.log('USERS LOADED');
          this.users=this.usuarioService.getUsers();
        }
      );
    }
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  searchUsers(){
    console.log('ENRTO');
    console.log('USERNAME',this.searchbox_select_rival);
    if(this.searchbox_select_rival!=''){
      this.users=this.usuarioService.searchUsers(this.searchbox_select_rival);
    }else{
      this.users=this.usuarioService.getUsers();
    }
  }
  randomRival(){
    this.userSelected=this.users[Math.floor(Math.random()*this.users.length)];
  }
  selectUser(user:User){
  //this.modal.close();
  this.modalService.dismissAll();
  this.userSelected=user;
  console.log('USER SELECTeD',user);
  }
}
