import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/service/user/user.service';

import { Plugins } from '@capacitor/core';
import * as PluginsLibrary from 'capacitor-video-player';
const { CapacitorVideoPlayer, Device } = Plugins;
import * as WebVPPlugin from 'capacitor-video-player';

const videoFrom:string = "http";

@Component({
  selector: 'app-tuto',
  templateUrl: './tuto.page.html',
  styleUrls: ['./tuto.page.scss'],
})
export class TutoPage implements AfterViewInit, OnInit {

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

    userCourse: any;
    videoCourses: any = []; 

    videoPlayer: any;

    constructor(
        private userService: UserService,
        private platform: Platform,
        private storage: NativeStorage
        ) { }

    async ngOnInit() {
        if (this.platform.is("desktop")) {

        this.user = await JSON.parse(localStorage.getItem('user'));
        
        } else {
        this.user = JSON.parse(await this.storage.getItem('user'));
        }

        this.userCourse = await this.userService.getTutosUser(this.user.id)
        
        
        console.log("toto")
        for(let course of this.userCourse){
            console.log(course)
            this.videoCourses.push(await this.userService.getTutosVideosUser(course.id))
        }
        
        console.log(this.videoCourses)
        

        
    }


    async ngAfterViewInit() {
        const info = await Device.getInfo();
        if (info.platform === "ios" || info.platform === "android") {
        this.videoPlayer = CapacitorVideoPlayer;
        } else {
        this.videoPlayer = PluginsLibrary.CapacitorVideoPlayer
        }

    }

    // Permet de lancer la lecture vidéo
    async play(url: string) {
        
        const res:any  = await this.videoPlayer.initPlayer({mode: "fullscreen",
                                                            url: url, subtitle: "video tutorama",
                                                            playerId: "fullscreen",
                                                            componentTag:"app-tuto"
                                                        });
    }

}
