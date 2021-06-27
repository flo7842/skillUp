import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Plugins } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import * as PluginsLibrary from 'capacitor-video-player';
const { CapacitorVideoPlayer, Device } = Plugins;
import * as WebVPPlugin from 'capacitor-video-player';

@Component({
  selector: 'app-tuto-details',
  templateUrl: './tuto-details.component.html',
  styleUrls: ['./tuto-details.component.scss'],
})
export class TutoDetailsComponent implements AfterViewInit, OnInit {
    

    videoCourse: any;
    titleCourse: string;
    

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private modal: ModalController
    ) {
    }

    async ngOnInit() {
    }

    async ngAfterViewInit() {

        const info = await Device.getInfo();
        if (info.platform === "ios" || info.platform === "android") {
        this.videoCourse = CapacitorVideoPlayer;
        } else {
        this.videoCourse = PluginsLibrary.CapacitorVideoPlayer
        }

    }

    // Permet de lancer la lecture vidéo
    async play(url: string) {
        
        const res:any = await this.videoCourse.initPlayer({mode: "fullscreen",
                                                            url: url, subtitle: "video skillUp",
                                                            playerId: "screenPlayer",
                                                            componentTag:"app-tuto-details"
                                                        });
    }


    close() {
        this.modal.dismiss({
            'dismissed': true
        });
      }

}
