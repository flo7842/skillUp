import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { UserService } from '../../service/user/user.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { User } from '../../interfaces/user';
import { CourseService } from '../../service/course/course.service';
import { CommandService } from '../../service/command/command.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  user: any = [];
  userRole: any = [];
  courses: any = [];
  commandLine: any = [];
  invoice: any = [];
  isAdmin: boolean = false;
  userId: number;

  constructor(
    private userService: UserService,
    private courseService: CourseService,
    private commandLineService: CommandService,
    private storage: NativeStorage,
    private platform: Platform
    ) {}

  async ngOnInit(){

    this.courses = await this.courseService.getData();
    this.commandLine = await this.commandLineService.getDataByCommand(1);
    console.log(this.commandLine)
    if (this.platform.is("desktop")) {
      
      this.user = JSON.parse(localStorage.getItem('user'))
    }else{
      this.user = this.storage.getItem('user')
    }
    this.userId = this.user.id
    
    this.userRole = await this.userService.getUserByRole(this.userId);
    if(this.userRole !== undefined && this.userRole.name == "admin"){
        this.isAdmin = true;
    }
    
  }

}
