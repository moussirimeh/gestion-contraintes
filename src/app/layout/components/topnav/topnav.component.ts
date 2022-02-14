import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  ViewChild,
  HostListener,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
// import { enableRipple } from '@syncfusion/ej2-base';
import {
  MenuItemModel,
  MenuEventArgs,
} from '@syncfusion/ej2-angular-navigations';
import { closest } from '@syncfusion/ej2-base';
import {
  BeforeOpenCloseMenuEventArgs,
  MenuAnimationSettingsModel,
} from '@syncfusion/ej2-angular-navigations';
import { TopnavService } from './topnav.service';
import { MenuItems } from './MenuItems';
import { LoginService } from 'src/app/login/login.service';
import { Dialog, OverlayPanel } from 'primeng/primeng';
/*import {
  MenuComponent,
  FieldSettingsModel,
} from '@syncfusion/ej2-angular-navigations';*/
// import { FaService } from '../../services/fa.service';
// import { RepresanService } from '../../services/represan.service';
import { SteService } from '../../services/ste.service';
import { globals } from 'src/environments/environment';

// import { MouveinventService } from '../../services/mouveinvent.service';
// enableRipple(true);

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TopnavComponent implements OnInit {
  @ViewChild('menuID')
  // private menuObj: MenuComponent;
  errorMessage = '';
  dateServeur = '';
  DateServeur: Date;
  year: number;
  month: number;
  dateinvent: string ;
  invent: string ;
  msg: string;
  cd: string;
  emplacement: string ;
  emp: string ;
  cod: string ;
  blocked = true;
  listemp: any;
  menuText1: any[];
  constructor(
    public router: Router,
    private translate: TranslateService,
    private topnavService: TopnavService,
    private loginService: LoginService,
  //  private faService: FaService,
  //  private represanService: RepresanService,
    private steService: SteService,
  //  private mouveinventService: MouveinventService ,


  ) {
    this.router.events.subscribe((val) => {
      if (
        val instanceof NavigationEnd &&
        window.innerWidth <= 100 &&
        this.isToggled()
      ) {
        this.toggleSidebar();
      }
    });
  }

  showConfirmFactCollective = false;
  showConfirmINV  = false;
  showINV  = false;

  displayErrorDialog = false;
  mdpFactCollective = '';
  mdpInventaire = 'invokok';
  mdpInvent = null;

 // listemouve_inv: any;

  @ViewChild('dialogpwrd')
  dialogpwrd: Dialog;
  public pushRightClass: string;
  public pushLeftClass: string;
  @ViewChild('ov')
  public ov: OverlayPanel;
  msgs = '';
  wasInside: boolean;
  styleOvPanelError = {
    'text-align': 'center',
    'font-size': '14px',
    'background-color': ' #f8b7bd',
  };
  styleOvPanelSuccess = {
    'text-align': 'center',
    'font-size': '12px',
    'background-color': ' #b7d8b7',
  };
  styleOvPanel = {};
  public menuItems: MenuItemModel[] = [];
  public menus = [
    'Analyse',
   
  ];
  // public animation: MenuAnimationSettingsModel = { duration: 800 };
  public IAmDoingSomething = true;
  public login: string;
  public mdp: string;
  public menuText = [[], [], [], [], [], [], [], [], [], [], [], []];






  public animation: MenuAnimationSettingsModel = { duration: 800 };


  public onBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
    // Restricting sub menu wrapper height
    if (args.items.length > 13) {
      (closest(args.element, '.e-menu-wrapper') as HTMLElement).style.height =
        '68vh';
    }
    // Handling sub menu items
  /*  for (let i = 0; i < args.items.length; i++) {
      if (this.hiddenItems.indexOf(args.items[i].text) > -1) {
        this.menuObj.hideItems([args.items[i].text], false);
      }
    }*/
  }




  async ngOnInit() {

    await this.steService
        .getDateServeur()
        .toPromise()
        .then((data: string) => (this.dateServeur = data));
    const nameObj1 = [
      { text: 'Analyse des contraintes', iconCss: 'em-icons e-open' }
  // { text: 'Ajout-Modif-Supp Référence', iconCss: 'em-icons e-open' }
    ];
  
 
    this.pushRightClass = 'push-right';
    this.pushLeftClass = 'push-left';
    this.login = localStorage.getItem('login');
    this.mdp = localStorage.getItem('mdp');

    let data = [];
    await this.topnavService
      .getLoginName(this.login)
      .toPromise()
      .then((dataa) => {data = dataa; });

    const st1: string = data['_embedded'].users[0].menu1;
    const menu1 = st1.split('');
    for (let i = 0; i < menu1.length; i++) {
          if (menu1[i] === 'A') {
            this.menuText[0].push(nameObj1[i]);
          }
        }
    for (let i = 0; i < this.menuText.length; i++) {
      if (this.menuText[i].length > 0) {
        this.menuItems.push({
          text: this.menus[i],
          items: this.menuText[i],
        });
      }
    }

    this.IAmDoingSomething = false;
    setTimeout(() => (this.IAmDoingSomething = true), 1);

      }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }



  async itemSelect(args: MenuEventArgs) {
    // localStorage.setItem('selectedMenu', args.item.text);
    globals.selectedMenu = args.item.text;

    //Analyse contraintes
    if (args.item.text === 'Analyse des contraintes') {
      this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        localStorage.setItem('isdashboard', 'false');
        this.router.navigate(['/Analyse-contraintes']);
      });

    }

  }

 







  toggleSidebar() {
    if (this.IAmDoingSomething === true) {
      this.IAmDoingSomething = false;
    } else {
      this.IAmDoingSomething = true;
    }
  }

  async onLoggedout() {
    await this.loginService
      .procedureStocke(localStorage.getItem('login'), 'SORTIE')
      .toPromise()
      .then((data) => {});
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('login');
    localStorage.removeItem('selectedMenu');
    localStorage.removeItem('mdp');

    this.router.navigate(['/login']);
    window.close();
  }

  changeLang(language: string) {
    this.translate.use(language);
  }

}
