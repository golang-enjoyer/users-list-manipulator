import { Component } from '@angular/core';
import { ModalService } from './modal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  showModal$: Observable<boolean> = this.modalService.showModal$;
  
  constructor(private modalService: ModalService) {

  }

  closeModal(): void {
    this.modalService.closeModal()
  }
}
