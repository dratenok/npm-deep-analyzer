import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    private headers: Headers = new Headers();
    private apiServer = 'https://api.npms.io';
    // private apiServer = 'https://registry.npmjs.org';
    // private apiServer: string = 'https://api.github.com';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json'
        })
    };

    constructor(private http: HttpClient) {
        this.headers.set('Content-Type', 'application/json');
    }

    ngOnInit(): void {
        // const endPoint = '/users';
        // this.get(endPoint).subscribe((res) => console.log(res));

        // const url = require('url');
        // const registryUrl = require('registry-url');
        // const registryAuthToken = require('registry-auth-token');
        // const range = 'pdfmake'.split('/')[0];
        // const _registryUrl = registryUrl(range);
        // const registryToken = registryAuthToken(_registryUrl, {recursive: true});
        // // const packageUrl = url.resolve(_registryUrl, encodeURIComponent('pdfmake')
        // //         //     .replace(/^%40/, '@'));

        // this.httpOptions = {
        //     headers: new HttpHeaders({
        //         'Content-Type':  'application/json',
        //     })
        // };
        //
        this.get('v2/package/pdfmake').subscribe(console.log);
    }

    get(endPoint: string, options?: any): Observable<any> {
        return this.http.get(this.createUrl(endPoint), this.getRequestOptions(options));
    }

    createUrl(endPoint: any): string {
        let url = this.apiServer + endPoint;
        if (!endPoint.startsWith('/')) {
            url = this.apiServer + '/' + endPoint;
        }

        return url;
    }

    getRequestOptions(options?: any) {
        return Object.assign({}, options, this.httpOptions);
    }
}
