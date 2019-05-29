import {Component, OnInit} from '@angular/core';
import {forkJoin, Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {debounceTime, filter} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {ContributorsDialogComponent} from './contributors-dialog/contributors-dialog.component';

export enum API_SERVERS {
    NPM_API_SERVER = 'https://api.npms.io/v2/package',
    GITHUB_API_SERVER = 'https://api.github.com'
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    value = '';
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json'
        })
    };

    isLoad = false;

    private inputChanged$: Subject<string> = new Subject();

    public packageEvaluations: {packageName: string, npmPackage: any}[] = [];

    constructor(private http: HttpClient,
                public dialog: MatDialog) {
    }

    onInputChange({target}: {target: any}) {
        const value = target.value;
        this.inputChanged$.next(value);
    }

    onInputReset() {
        this.value = '';
        this.packageEvaluations = [];
    }

    ngOnInit(): void {
        this.inputChanged$.pipe(debounceTime(2000), filter(v => !!v)).subscribe((value: string) => {
            this.packageEvaluations = [];
            this.getPackageInfo(value);
        });
    }

    onShowContributors(contributors: any[]) {
        const usersInfoObs = contributors.map(c => this.get(API_SERVERS.GITHUB_API_SERVER, `/users/${c.username}`));
        this.isLoad = true;
        forkJoin(usersInfoObs).subscribe((data) => {
            const sortData = data.sort((a, b) => {
                return b.created_at.split('T')[0].replace(/-/g, '') - a.created_at.split('T')[0].replace(/-/g, '');
            });
            this.openDialog(sortData);
            this.isLoad = false;
        });
    }

    openDialog(data: any[]): void {
        const dialogRef = this.dialog.open(ContributorsDialogComponent, {
            width: '400px',
            data
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // this.animal = result;
        });
    }

    getPackageInfo(packageName: string) {
        if (this.packageEvaluations.find(p => p.packageName === packageName)) {
            return;
        }
        this.get(API_SERVERS.NPM_API_SERVER, packageName.replace('/', '%2F')).subscribe((res) => {
            this.packageEvaluations.push({packageName, npmPackage: res});
            console.log(res);
            if (res.collected.metadata.dependencies) {
                Object.keys(res.collected.metadata.dependencies).forEach((p) => this.getPackageInfo(p))
            }
        });
    }

    addPackageEvaluation(evaluation: any) {
        this.packageEvaluations.push(evaluation);
    }

    get(apiServer: API_SERVERS, endPoint: string, options?: any): Observable<any> {
        return this.http.get(this.createUrl(apiServer, endPoint), this.getRequestOptions(options));
    }

    createUrl(apiServer: API_SERVERS, endPoint: any): string {
        return endPoint.startsWith('/') ? apiServer + endPoint : apiServer + '/' + endPoint;
    }

    getRequestOptions(options?: any) {
        return Object.assign({}, options, this.httpOptions);
    }
}
