import { Component, OnInit } from '@angular/core';
import { IAlbum, IPictures, IUser } from 'src/interfaces/interfaces';
import { UserService } from 'src/services/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

    constructor(public userService: UserService) { }

    public ngOnInit(): void {
    }

}
