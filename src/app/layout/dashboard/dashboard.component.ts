import { Component, OnInit } from '@angular/core';
import { Ste } from '../services/ste';
import { SteService } from '../services/ste.service';





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  places = [];
  baniere = [];
  responsiveOptions;
  ste: Ste = {
    id: '',
    logiciel: '',
    codep: '',
    societe: '',
    adresse: '',
    ville: '',
    tel: '',
    fax: '',
    deno: '',
    gros: '',
    compta: '',
    stock1Null: '',
    rec: '',
    instance: '',
    reservatio: '',
    gerant: '',
    datsave: '',
    soldecc: '',
    soldece: '',
    dsoldec: '',
    email: '',
    matricule: '',
    ligneImpot: ''
  };
  dataCommandes: any;
  dataFactures: any;
  dataBls: any;
  creanceClient: any = {
    id: '',
    deno: '',
    reg: '',
    ech: '',
    solde: '',
    montantC: '',
    imp: { value: '', pourc: 0 },
    r30: { value: '', pourc: 0 },
    r60: { value: '', pourc: 0 },
    r90: { value: '', pourc: 0 },
    r91: { value: '', pourc: 0 }
  };
  facturesPayes: number;
  facturesNonPayes: number;
  blsLivres: number;
  blsNonLivres: number;
  selectedClient;
  constructor(

  ) {
    localStorage.setItem('isdashboard', 'true');
    this.places = [
      {
          imgSrc: 'assets/images/EQM.png',
          place: 'Cozy 5 Stars Apartment',
          description:
              // tslint:disable-next-line:max-line-length
              'The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona.',
          charge: '$899/night',
          location: 'Barcelona, Spain'
      },
      {
          imgSrc: 'assets/images/EQM1.png',
          place: 'Office Studio',
          description:
              // tslint:disable-next-line:max-line-length
              'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.',
          charge: '$1,119/night',
          location: 'London, UK'
      },
      {
          imgSrc: 'assets/images/EQM2.png',
          place: 'Beautiful Castle',
          description:
              // tslint:disable-next-line:max-line-length
              'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Milan.',
          charge: '$459/night',
          location: 'Milan, Italy'
      }
  ];
    this.responsiveOptions = [
      {
        breakpoint: '500px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];

    this.dataCommandes = {
      labels: ['Non Soldé', 'Soldé'],
      datasets: [
        {
          data: [350, 130],
          backgroundColor: ['#FF6384', '#36A2EB'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB']
        }
      ]
    };
  }
  async ngOnInit() {
  }

  isNull(chaine: any): string {
    if (chaine === null) {
      return '';
    } else {
      return chaine;
    }
  }
}
