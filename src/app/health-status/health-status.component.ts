import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-health-status',
  templateUrl: './health-status.component.html',
  styleUrls: ['./health-status.component.css']
})
export class HealthStatusComponent implements OnInit {
  @Input() count: number | string = 0;
  @Input() color: string = 'green';
  @Input() field: string = '';

  ngOnInit() {
  }

}
