import { Component, OnInit } from '@angular/core';
import { IAlbum, IPictures, IUser } from 'src/interfaces/interfaces';
import { UserService } from 'src/services/user.service';

@Component({
    selector: 'app-photo-album',
    templateUrl: './photo-album.component.html',
    styleUrls: ['./photo-album.component.sass']
})
export class PhotoAlbumComponent implements OnInit {

    public title = 'Photo-Album';
    public users: Array<IUser>;
    public albums: Array<IAlbum>;
    public albumPhotos: Array<IPictures>;
    public showAlbums = false;
    public showPhotos = false;
    public activeUser: number;
    public selectedItem: number;

    constructor(public userService: UserService) { }

    public ngOnInit(): void {
        this.userService.generateUsers().subscribe((response) => {
            this.users = response;
        });

        this.userService.getAlbumsDataById(1).subscribe((response) => {
            //console.log(response);
        });
    }

    public getUserAlbum(userId: number): void {
        this.userService.getAlbumsById(userId).subscribe((response) => {
            this.albums = response;
            this.showPhotos = false;
            this.showAlbums = true;
            this.activeUser = userId;
        });
    }

    public getAlbumPhotos(albumId: number): void {
        this.userService.getPhotosByAlbumId(albumId).subscribe((response) => {
            this.albumPhotos = response;
            this.showAlbums = false;
            this.showPhotos = true;
        });
    }

    public createAlbum(userId: number): void {
        this.activeUser = userId;
        const newAlbum: IAlbum = {
            title: 'some Title',
            userId
        };
        this.userService.createAlbum(newAlbum, this.activeUser).subscribe((response) => {
            console.log(response)
        });
    }

    public deleteAlbum(albumId: number, index: number): void {
        this.userService.deleteAlbumById(albumId, this.activeUser).subscribe((response) => {
            console.log(response)
            this.albums.splice(index, 1);
        });
    }

    public deletePicture(albumId: number, pictureId: number, index: number): void {
        this.albumPhotos.splice(index, 1);
        this.userService.deletePictureById(albumId, pictureId, this.activeUser).subscribe((response) => {
            console.log(response)
        });
    }



}
