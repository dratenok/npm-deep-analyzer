import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatInputModule, MatProgressSpinnerModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {PackageViewComponent} from './package-view/package-view.component';
import {HealthStatusComponent} from './health-status/health-status.component';
import {ContributorsDialogComponent} from './contributors-dialog/contributors-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        PackageViewComponent,
        HealthStatusComponent,
        ContributorsDialogComponent,
    ],
    entryComponents: [ContributorsDialogComponent],
    imports: [
        FormsModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatDialogModule,
        MatProgressSpinnerModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
