import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAlbum, IPictures, IUser } from 'src/interfaces/interfaces';

interface Response {
    [key: string]: any;
}

@Injectable({
    providedIn: 'root'
})

export class UserService {
    public users: Array<IUser>;
    public actionMetricsModel = {
        album: {
            created: 0,
            deleted: 0
        },
        pictures: {
            created: 0,
            deleted: 0
        }
    };

    constructor(private http: HttpClient) { }

    public generateUsers(): Observable<Array<IUser>> {
        const url: string = environment.apiLink + 'users';

        return this.http.get<Array<IUser>>(url);
    }

    public getAlbumsById(id: number): Observable<Array<IAlbum>> {

        const url: string = environment.apiLink + 'users/' + id + '/albums';

        return this.http.get<Array<IAlbum>>(url);
    }

    public getAlbumsDataById(albumId: number): Observable<Response> {
        const url: string = environment.apiLink + 'albums/' + albumId;

        return this.http.get<Response>(url);
    }

    public getPhotosByAlbumId(albumId: number): Observable<Array<IPictures>> {
        const url: string = environment.apiLink + 'albums/' + albumId + '/photos';

        return this.http.get<Array<IPictures>>(url);
    }

    public createAlbum(album: IAlbum, user: number): Observable<IAlbum> {
        const url: string = environment.apiLink + 'albums';
        this.logActivity(user, 'created', 'album');
        this.actionMetrics(user, 1, 'album');

        return this.http.post<IAlbum>(url, album);
    }


    public deleteAlbumById(albumId: number, user: number): Observable<Response> {
        const url: string = environment.apiLink + 'albums/' + albumId;
        this.logActivity(user, 'deleted', 'album');
        this.actionMetrics(user, 2, 'album');

        return this.http.delete<Response>(url);
    }

    public deletePictureById(albumId: number, pictureId: number, user: number): Observable<Response> {
        const url: string = environment.apiLink + 'albums/' + albumId + '/photos/' + pictureId;
        this.logActivity(user, 'deleted', 'picture');
        this.actionMetrics(user, 2, 'picture');

        return this.http.delete<Response>(url);
    }

    public logActivity(userId: number, activity: string, target: string): void {
        let user = '';
        if (localStorage.getItem('counter') === null) {
            localStorage.setItem('counter', '0');
        }
        this.generateUsers().subscribe((response) => {
            user = response[userId - 1].name;
            const counter: string = (+localStorage.getItem('counter') + 1).toString();
            localStorage.setItem(counter, 'User ' + user + ' ' + activity + ' one ' + target);
            localStorage.setItem('counter', counter);
        });
    }

    public actionMetrics(userId: number, action: number, target: string): void {
        let user = '';
        this.generateUsers().subscribe((response) => {
            user = response[userId - 1].name;
            if (localStorage.getItem(user) === null) {
                localStorage.setItem(user, JSON.stringify(this.actionMetricsModel));
            }

            const storedStats = JSON.parse(localStorage.getItem(user));
            console.log(storedStats);
            // 1 is created, 2 is deleted
            if (action === 1) {
                if (target === 'album') {
                    storedStats.album.created++;
                } else {
                    storedStats.pictures.created++;
                }
            } else {
                if (target === 'album') {
                    storedStats.album.deleted++;
                } else {
                    storedStats.pictures.deleted++;
                }
            }
            console.log(storedStats);
            localStorage.setItem(user, JSON.stringify(storedStats));
        });
    }

}
