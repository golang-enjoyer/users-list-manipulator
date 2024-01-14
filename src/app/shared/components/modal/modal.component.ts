import { Component, inject } from '@angular/core';
import { ModalService } from './modal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  modalService = inject(ModalService);

  showModal$: Observable<boolean> = this.modalService.showModal$;

  closeModal(): void {
    this.modalService.closeModal();
  }
}
