import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { ApolloComponent } from '../../components/apollo/apollo.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, ApolloComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
