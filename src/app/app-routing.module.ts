import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogsComponent } from './components/logs/logs.component';
import { PhotoAlbumComponent } from './components/photo-album/photo-album.component';

const routes: Routes = [
    { path: 'photo-album', component: PhotoAlbumComponent },
    { path: 'logs', component: LogsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
