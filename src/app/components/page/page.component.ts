import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-page",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.css"],
})
export class PageComponent implements OnInit {
  public currentName: string;
  public currentSurname: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.currentName = "";
    this.currentSurname = "";
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currentName = params.name;
      this.currentSurname = params.surname;
    });
  }

  redirection() {
    this.router.navigate(["/page-test", "Dedín", "Liberato"]);
  }
}
