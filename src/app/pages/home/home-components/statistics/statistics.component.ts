import { Component, OnInit } from '@angular/core';
import { langHelper } from 'src/app/services/helpers-and-utilities/language-helper';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  constructor(private langHelper: langHelper) { }

  ngOnInit(): void {
  }

}
