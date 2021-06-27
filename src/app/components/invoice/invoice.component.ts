import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {

  invoiceUser;
  commands;
  invoices: any = []
  user: any = [];
  total: any = [];
  

  constructor(
    private userService: UserService,
    private modal: ModalController
  ) { }

  
  async ngOnInit() {
    console.log(this.invoiceUser)
    this.user = await this.userService.getUser();
    
    
    for(const item of this.invoiceUser){
      this.invoices.push({
        commandId: item.commandId,
        title: item.title,
        price: item.price
      })

      this.total.push(item.price + item.price * 20 / 100)

      
    }

    this.total = this.total.reduce((a, b) => a + b)

   
  }

  close() {
    this.modal.dismiss({
        'dismissed': true
    });
  }

}
