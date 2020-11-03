import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LogsComponent } from './components/logs/logs.component';
import { UserService } from 'src/services/user.service';
import { PhotoAlbumComponent } from './components/photo-album/photo-album.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SuiModule } from 'ng2-semantic-ui';


@NgModule({
    declarations: [
        AppComponent,
        LogsComponent,
        PhotoAlbumComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CommonModule,
        BrowserAnimationsModule,
        SuiModule
    ],
    providers: [UserService],
    bootstrap: [AppComponent]
})
export class AppModule { }
