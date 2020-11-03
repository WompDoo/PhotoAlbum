import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';

@Component({
    selector: 'app-logs',
    templateUrl: './logs.component.html',
    styleUrls: ['./logs.component.sass']
})
export class LogsComponent implements OnInit {
    public users: Array<string> = [];
    public usersActionMetrics: Array<any> = [];
    public logs: Array<string> = [];
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

    constructor(public userService: UserService) { }

    public ngOnInit(): void {
        this.userService.generateUsers().subscribe((response) => {
            for (const user of response) {
                this.users.push(user.name);
            }
            this.getActionMetrics();
        });
        this.getLogs();
    }

    public getLogs(): void {
        if (localStorage.getItem('counter') === null) {
            this.logs.push('There are no logs yet.');
        } else {
            this.logs = [];
            for (let i = 1; i < +localStorage.getItem('counter') + 1; i++) {
                this.logs.push(localStorage.getItem(i.toString()));
            }
            console.log(this.logs)
        }
    }

    public getActionMetrics(): void {
        for (const user of this.users) {
            if (localStorage.getItem(user) === null) {
                localStorage.setItem(user, JSON.stringify(this.actionMetricsModel));
            }
            this.usersActionMetrics.push(JSON.parse(localStorage.getItem(user)));
        }

        console.log(this.usersActionMetrics);
    }

}
