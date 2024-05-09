import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-apollo',
  standalone: true,
  imports: [],
  templateUrl: './apollo.component.html',
  styleUrl: './apollo.component.scss'
})
export class ApolloComponent implements OnInit {
  helloMsg: string | undefined;
  constructor(private testSvc: TestService) { }

  ngOnInit() {
    this.testSvc.getHello().subscribe((result: any) => {
      console.log(result);
      this.helloMsg = result.data.hello;
    });
  }

}
