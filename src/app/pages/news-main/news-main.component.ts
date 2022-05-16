import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-news-main",
  templateUrl: "./news-main.component.html",
  styleUrls: ["./news-main.component.scss"],
})
export class NewsMainComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  Route() {
    this.router.navigate(["/news-details"]);
  }
}
