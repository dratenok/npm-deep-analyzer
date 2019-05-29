import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-package-view',
  templateUrl: './package-view.component.html',
  styleUrls: ['./package-view.component.css']
})
export class PackageViewComponent {
  @Input() name: string = '';
  @Input() npmPackage: any = {};

  @Output() showContributors: EventEmitter<void> = new EventEmitter();

  onShowContributors() {
    this.showContributors.emit(this.npmPackage.collected.github.contributors);
  }

}
