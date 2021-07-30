import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController, ModalController, Platform } from '@ionic/angular';

import { User } from 'src/app/interfaces/user';

import { CommandService } from 'src/app/service/command/command.service';
import { InvoiceService } from 'src/app/service/invoice/invoice.service';

import { InvoiceComponent } from 'src/app/components/invoice/invoice.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

    user: User = 
    { 
        id: undefined,
        email: '',
        user_password: '',
        user_name: '',
        firstname: '',
        lastname: '',
        avatar: "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'",
        birth_date: undefined,
        phone_number: '',
        street_name: '',
        street_number: undefined,
        batiment: '',
        postal_code: '',
    }

    commands: any = []
    commandUser: any;
    dateTimeCourse: any = [];

    invoiceDetails: any = []; 
    tt: any = [];

    arrayUniqueByKey: any = [];

    constructor(
        private platform: Platform,
        private storage: NativeStorage,
        private modal: ModalController,
        private loadingCtrl: LoadingController,
        private commandService: CommandService,
        private invoiceService: InvoiceService,
    ) { }

    async ngOnInit() {

        this.autoLoader();
      
        if (this.platform.is("desktop")) {
        
            this.user = await JSON.parse(localStorage.getItem('user'));
        
        } else {
            this.user = JSON.parse(await this.storage.getItem('user'));
        }
        
        this.commandUser = await this.commandService.getCommandFromUser(this.user.id)
        this.dateTimeCourse.push(this.commandUser.createdat)
        
        for(let tt of this.commandUser){
         
            let dateOnly;
            let hoursMin;
            this.dateTimeCourse = tt.createdAt
            dateOnly = this.dateTimeCourse.substr(0,10)
            
            hoursMin = this.dateTimeCourse.substr(11,8)
            this.dateTimeCourse = dateOnly + " " + hoursMin
        }

        for(const item of this.commandUser){
            this.commands.push({
                commandId: item.commandId,
                title: item.title,
                dateCommand: this.dateTimeCourse,
                price: item.price + item.price * 20 / 100,
            })
        }

        let duplicates = [];

        this.commands.forEach((el, i) => {
            this.commands.forEach((element, index) => {
                if (i === index) return null;
                if (element.commandId === el.commandId) {
                    if (!duplicates.includes(el)) duplicates.push(el);
                }
            });
        });
        
        
        for(let arr of duplicates){
            var index = this.commands.map(x => {
                return x.commandId;
            }).indexOf(arr.commandId);
            this.commands.splice(index, 1);
        }
        this.arrayUniqueByKey = [...new Map(duplicates.map(item => [item['commandId'], item])).values()];
        
    }

    autoLoader() {
        this.loadingCtrl.create({
            message: 'Chargement...',
            duration: 2000
        }).then((response) => {
            response.present();
            response.onDidDismiss().then((response) => {
                console.log('Loader dismissed', response);
            });
        });
    }

    async openInvoiceComponent(id: number) {
      
        this.invoiceDetails = await this.invoiceService.getAllInvoicesByUser(id)
  
     
        const modal = await this.modal.create({
            component: InvoiceComponent,
            componentProps: {
                'invoiceUser': this.invoiceDetails.data,
                'commands': this.commands
            }
        });
        
        return await modal.present();
    }
}
