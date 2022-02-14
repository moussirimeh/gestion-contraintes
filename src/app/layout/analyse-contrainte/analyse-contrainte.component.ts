import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Table } from "primeng/table";
import { ClientService } from "../services/client.service";
import { SfamilleService } from "../services/sfamille.service";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { globals } from "src/environments/environment";

import { AchatService } from "../services/achat.service";
import { Achat0Service } from "../services/achat0.service";
import { BrouService } from "../services/brou.service";
import { BrouContService } from "../services/brouCont.service";

@Component({
  selector: "app-analyse-contrainte",
  templateUrl: "./analyse-contrainte.component.html",
  styleUrls: ["./analyse-contrainte.component.css"],
})
export class AnalyseContrainteComponent implements OnInit {
  etat = [
    { def: "✅ Pas d'erreur", style: "green" },
    { def: "⚠️ Erreur non grave", style: "rgb(255 165 0)" },
    { def: "❌ Erreur grave ", style: "red" },
  ];
 @ViewChild('dt1')
  table : Table;

  contraintes = [
    { rang: "1", nom: "Vérification des achats", etat: "", couleur: "" },
    { rang: "2", nom: "Vérification des règlements fournisseur", etat: "", couleur: "" },
    { rang: "3", nom: "vérification brou ", etat: "", couleur: "" },
    { rang: "4", nom: "vérification brou cont", etat: "", couleur: "" },
    { rang: "5", nom: "eeeeeeeeeeeeeeee", etat: "", couleur: "" },
    { rang: "6", nom: "fffffffffffffffff", etat: "", couleur: "" },
    { rang: "7", nom: "ggggggggggggggggg", etat: "", couleur: "" },
    { rang: "8", nom: "hhhhhhhhhhhhhhhhh", etat: "", couleur: "" },
    { rang: "9", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "10", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "11", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "12", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "13", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "14", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "15", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "16", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "17", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "18", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "19", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "20", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "21", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "22", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "23", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },

    { rang: "24", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "25", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "26", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "27", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "28", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "29", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "30", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "31", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "32", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "33", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "34", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "35", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "36", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "37", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "38", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "39", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "40", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "41", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "42", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "43", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "44", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "45", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "46", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "47", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "48", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "49", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "50", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "51", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "52", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "53", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },
    { rang: "54", nom: "aaaaaaaaaaaaaaa", etat: "", couleur: "" },

  ];
  selectedContraintes = [];
  societe: any;
  annulerExecution=false;
  msgInterruption='';

  disabledCheckbox = false;
  hiddenBtnExecuter = true;
  hiddenBtnAppercu = true;
  hiddenBtnNouvelSaisie = true;
  cols: { field: string; header: string; }[];
 



  isLoading = false;
	async wait(ms: number): Promise<void> {
		return new Promise<void>( resolve => setTimeout( resolve, ms) );
	}

	







  constructor(
    private achatService: AchatService,
    private achat0Service: Achat0Service,
    private clientService: ClientService,
    private sFamilleService: SfamilleService,
    private brouService: BrouService,
    private brouContService: BrouContService
  ) {}

rowSelect(e, data){
  console.log('selected row  ', data)
    if(this.selectedContraintes.length >0 && this.hiddenBtnAppercu === true ){
      this.hiddenBtnExecuter = false;
    }else{
      if(this.selectedContraintes.length >0 && this.hiddenBtnAppercu === false  ){
      this.hiddenBtnExecuter = true;
     // this.hiddenBtnAppercu = true;
    
    
    }else{
      this.hiddenBtnExecuter = true;
      this.hiddenBtnAppercu = true;
      this.hiddenBtnNouvelSaisie = true;
    }
  }
  }
 
  nouvelSaisie(){
    this.hiddenBtnExecuter = false;
    this.hiddenBtnAppercu = true;
    this.disabledCheckbox = false;
    this.hiddenBtnNouvelSaisie = true;
    this.msgInterruption = '';
    this.annulerExecution =false;

    for (const cnt of this.selectedContraintes){
         cnt.etat = '';
    }
  this.contraintes = this.contraintes;
  document.getElementById(`row_code${this.contraintes[0].rang}`)
          .scrollIntoView({
            behavior: 'smooth',
            inline: 'start',
            block: 'start',
          });
  }
  

  changeSelectionAll(e){
    if(this.selectedContraintes.length >0 && this.hiddenBtnAppercu === true ){
      this.hiddenBtnExecuter = false;
    
    }else{
      if(this.selectedContraintes.length >0 && this.hiddenBtnAppercu === false  ){
      this.hiddenBtnExecuter = true;
     // this.hiddenBtnAppercu = true;
    
    
    }else{
      this.hiddenBtnExecuter = true;
      this.hiddenBtnAppercu = true;
      this.hiddenBtnNouvelSaisie = true;
    }
  }
  }

  ngOnInit() {
    this.hiddenBtnExecuter = true;
    this.hiddenBtnAppercu = true;
    this.hiddenBtnNouvelSaisie = true;
    this.disabledCheckbox = false;
    this.cols = [
      { field: "nom", header: "Nom" },
      { field: "etat", header: "Etat" }
   
    ];


  }

 async annuler(){
    this.annulerExecution = true;
    this.isLoading = false;
    this.hiddenBtnAppercu = false;
    this.hiddenBtnExecuter = true;
    this.hiddenBtnNouvelSaisie = false;
  }



  async executer(e) {
    this.isLoading = true;
    if (this.selectedContraintes.length > 0) {
      console.log("la liste selectionnée ", this.selectedContraintes);
      console.log("annulerExecution ", this.annulerExecution);
      this.disabledCheckbox = true;
      for (let obj of this.selectedContraintes) {
      
        if(this.annulerExecution){
          this.isLoading = false;
          this.hiddenBtnExecuter = true;
          this.hiddenBtnAppercu = false;
        this.msgInterruption ='L\'exécution  a été interrompue !!';
         break;
        }else{
          this.hiddenBtnExecuter = true;
          this.isLoading = true;
          this.msgInterruption ='';
          if(Number(obj.rang)>12){
           
          }
        
        switch (obj.rang) {
       
          case "1":
            {
              let resultRequest = new Array();
              await this.achatService
                .verifAchatWidhTotDeviseAndTotDTAndOp()
                .toPromise()
                .then((data :any) => {
                  console.log("resultat 1 ", data);
                  resultRequest = data;
                });
              if (resultRequest.length > 0) {
                obj.etat = this.etat[2].def;
                obj.couleur = this.etat[2].style;
              } else {
                obj.etat = this.etat[0].def;
                obj.couleur = this.etat[0].style;
              }
            /*  document
              .getElementById(`row_code${obj.rang}`)
              .scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'start',
              });*/
            }
            break;
          case "2":
            {
              let resultRequest;
              await this.achat0Service
                .getTop1IDToVerifAchat0()
                .toPromise()
                .then((data) => {
                  console.log("resultat 2", data);
                  resultRequest = data;
                });
              if (resultRequest > 0) {
                obj.etat = this.etat[1].def;
                obj.couleur = this.etat[1].style;
              } else {
                obj.etat = this.etat[0].def;
                obj.couleur = this.etat[0].style;
              }
            /*  document
              .getElementById(`row_code${obj.rang}`)
              .scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'start',
              });*/
            }
            break;
          case "3":
            {
              let resultRequest=[];
              await this.brouService
                .getTop1IDToVerifBrou()
                .toPromise()
                .then((data) => {
                  console.log("resultat ", data);
                  resultRequest = data['_embedded'].brous;
                  if (resultRequest.length > 0) {
                    obj.etat = this.etat[2].def;
                    obj.couleur = this.etat[2].style;
                  } else {
                    obj.etat = this.etat[0].def;
                    obj.couleur = this.etat[0].style;
                  }
                });
            
            /*  document
              .getElementById(`row_code${obj.rang}`)
              .scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'start',
              });*/
            }
            break;
          case "4":
          { let resultRequest=[];
            await this.brouContService
              .getTop1IDToVerifBrouCont()
              .toPromise()
              .then((data) => {
                console.log("resultat ", data);
                resultRequest = data['_embedded'].brouCont;
                if (resultRequest.length > 0) {
                  obj.etat = this.etat[2].def;
                  obj.couleur = this.etat[2].style;
                } else {
                  obj.etat = this.etat[0].def;
                  obj.couleur = this.etat[0].style;
                }
              });
           
          /*  document
            .getElementById(`row_code${obj.rang}`)
            .scrollIntoView({
              behavior: 'smooth',
              inline: 'start',
              block: 'start',
            });*/
          
          }
            break;
          case "5":
            {
              let resultRequest;
              await this.sFamilleService
                .getNumberOfSfmNotInFamille()
                .toPromise()
                .then((data) => {
                  console.log("resultat ", data);
                  resultRequest = data;
                });
              if (resultRequest > 0) {
                obj.etat = this.etat[1].def;
                obj.couleur = this.etat[1].style;
              } else {
                obj.etat = this.etat[0].def;
                obj.couleur = this.etat[0].style;
              }
           /*   document
              .getElementById(`row_code${obj.rang}`)
              .scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'start',
              });*/
            }
            break;
          case "6":
            {
              let resultRequest;
              await this.sFamilleService
                .getNumberOfSfmNotInFamille()
                .toPromise()
                .then((data) => {
                  console.log("resultat ", data);
                  resultRequest = data;
                });
              if (resultRequest > 0) {
                obj.etat = this.etat[2].def;
                obj.couleur = this.etat[2].style;
              } else {
                obj.etat = this.etat[0].def;
                obj.couleur = this.etat[0].style;
              }
           /*   document
              .getElementById(`row_code${obj.rang}`)
              .scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'start',
              });*/
            }
            break;
          case "7":
            {
              let resultRequest;
              await this.clientService
                .getNumberOfCltNotInZone()
                .toPromise()
                .then((data) => {
                  console.log("resultat ", data);
                  resultRequest = data;
                });
              if (resultRequest > 0) {
                obj.etat = this.etat[1].def;
                obj.couleur = this.etat[1].style;
              } else {
                obj.etat = this.etat[0].def;
                obj.couleur = this.etat[0].style;
              }
           /*   document
              .getElementById(`row_code${obj.rang}`)
              .scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'start',
              });*/
            }
            break;
          case "8":
            {
              let resultRequest;
              await this.sFamilleService
                .getNumberOfSfmNotInFamille()
                .toPromise()
                .then((data) => {
                  console.log("resultat ", data);
                  resultRequest = data;
                });
              if (resultRequest > 0) {
                obj.etat = this.etat[1].def;
                obj.couleur = this.etat[1].style;
              } else {
                obj.etat = this.etat[0].def;
                obj.couleur = this.etat[0].style;
              }
         /*     document
              .getElementById(`row_code${obj.rang}`)
              .scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'start',
              });*/
            }
            break;
          case "9":
            {
              let resultRequest;
              await this.sFamilleService
                .getNumberOfSfmNotInFamille()
                .toPromise()
                .then((data) => {
                  console.log("resultat ", data);
                  resultRequest = data;
                });
              if (resultRequest > 0) {
                obj.etat = this.etat[2].def;
                obj.couleur = this.etat[2].style;
              } else {
                obj.etat = this.etat[0].def;
                obj.couleur = this.etat[0].style;
              }
             /* document
              .getElementById(`row_code${obj.rang}`)
              .scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'start',
              });*/
            }
            break;


          case "10":
              {
                let resultRequest;
                await this.clientService
                  .getNumberOfCltNotInZone()
                  .toPromise()
                  .then((data) => {
                    console.log("resultat ", data);
                    resultRequest = data;
                  });
                if (resultRequest > 0) {
                  obj.etat = this.etat[1].def;
                  obj.couleur = this.etat[1].style;
                } else {
                  obj.etat = this.etat[0].def;
                  obj.couleur = this.etat[0].style;
                }
               /* document
                .getElementById(`row_code${obj.rang}`)
                .scrollIntoView({
                  behavior: 'smooth',
                  inline: 'start',
                  block: 'start',
                });*/
              }
              break;
            case "11":
              {
                let resultRequest;
                await this.sFamilleService
                  .getNumberOfSfmNotInFamille()
                  .toPromise()
                  .then((data) => {
                    console.log("resultat ", data);
                    resultRequest = data;
                  });
                if (resultRequest > 0) {
                  obj.etat = this.etat[1].def;
                  obj.couleur = this.etat[1].style;
                } else {
                  obj.etat = this.etat[0].def;
                  obj.couleur = this.etat[0].style;
                }
             /*   document
                .getElementById(`row_code${obj.rang}`)
                .scrollIntoView({
                  behavior: 'smooth',
                  inline: 'start',
                  block: 'start',
                });*/
              }
              break;
            case "12":
              {
                let resultRequest;
                await this.sFamilleService
                  .getNumberOfSfmNotInFamille()
                  .toPromise()
                  .then((data) => {
                    console.log("resultat ", data);
                    resultRequest = data;
                  });
                if (resultRequest > 0) {
                  obj.etat = this.etat[2].def;
                  obj.couleur = this.etat[2].style;
                } else {
                  obj.etat = this.etat[0].def;
                  obj.couleur = this.etat[0].style;
                }
             /*   document
                .getElementById(`row_code${obj.rang}`)
                .scrollIntoView({
                  behavior: 'smooth',
                  inline: 'start',
                  block: 'start',
                });*/
              }
              break;
            case "13":
              {
                let resultRequest;
                await this.clientService
                  .getNumberOfCltNotInZone()
                  .toPromise()
                  .then((data) => {
                    console.log("resultat ", data);
                    resultRequest = data;
                  });
                if (resultRequest > 0) {
                  obj.etat = this.etat[1].def;
                  obj.couleur = this.etat[1].style;
                } else {
                  obj.etat = this.etat[0].def;
                  obj.couleur = this.etat[0].style;
                }
               /* document
                .getElementById(`row_code${obj.rang}`)
                .scrollIntoView({
                  behavior: 'smooth',
                  inline: 'start',
                  block: 'start',
                });*/
              }
              break;
            case "14":
              {
                let resultRequest;
                await this.clientService
                  .getNumberOfCltNotInZone()
                  .toPromise()
                  .then((data) => {
                    console.log("resultat ", data);
                    resultRequest = data;
                  });
                if (resultRequest > 0) {
                  obj.etat = this.etat[1].def;
                  obj.couleur = this.etat[1].style;
                } else {
                  obj.etat = this.etat[0].def;
                  obj.couleur = this.etat[0].style;
                }
              /*  document
                .getElementById(`row_code${obj.rang}`)
                .scrollIntoView({
                  behavior: 'smooth',
                  inline: 'start',
                  block: 'start',
                });*/
              }
              break;
            case "15":
              {
                let resultRequest;
                await this.sFamilleService
                  .getNumberOfSfmNotInFamille()
                  .toPromise()
                  .then((data) => {
                    console.log("resultat ", data);
                    resultRequest = data;
                 
                if (resultRequest > 0) {
                  obj.etat = this.etat[2].def;
                  obj.couleur = this.etat[2].style;
                } else {
                  obj.etat = this.etat[0].def;
                  obj.couleur = this.etat[0].style;
                }
                document
                .getElementById(`row_code${obj.rang}`)
                .scrollIntoView({
                  behavior: 'smooth',
                  inline: 'start',
                  block: 'start',
                });
              });
              }
              break;
            case "16":
              {
                let resultRequest;
                await this.clientService
                  .getNumberOfCltNotInZone()
                  .toPromise()
                  .then((data) => {
                    console.log("resultat ", data);
                    resultRequest = data;
                 
                if (resultRequest > 0) {
                  obj.etat = this.etat[1].def;
                  obj.couleur = this.etat[1].style;
                } else {
                  obj.etat = this.etat[0].def;
                  obj.couleur = this.etat[0].style;
                }
                document
                .getElementById(`row_code${obj.rang}`)
                .scrollIntoView({
                  behavior: 'smooth',
                  inline: 'start',
                  block: 'start',
                });
              });
              }
              break;
            case "17":
              {
                let resultRequest;
                await this.sFamilleService
                  .getNumberOfSfmNotInFamille()
                  .toPromise()
                  .then((data) => {
                    console.log("resultat ", data);
                    resultRequest = data;
                
                if (resultRequest > 0) {
                  obj.etat = this.etat[1].def;
                  obj.couleur = this.etat[1].style;
                } else {
                  obj.etat = this.etat[0].def;
                  obj.couleur = this.etat[0].style;
                }
                document
                .getElementById(`row_code${obj.rang}`)
                .scrollIntoView({
                  behavior: 'smooth',
                  inline: 'start',
                  block: 'start',
                });
              });
              }
              break;
            case "18":
              {
                let resultRequest;
                await this.sFamilleService
                  .getNumberOfSfmNotInFamille()
                  .toPromise()
                  .then((data) => {
                    console.log("resultat ", data);
                    resultRequest = data;
                
                if (resultRequest > 0) {
                  obj.etat = this.etat[2].def;
                  obj.couleur = this.etat[2].style;
                } else {
                  obj.etat = this.etat[0].def;
                  obj.couleur = this.etat[0].style;
                }
                document
                .getElementById(`row_code${obj.rang}`)
                .scrollIntoView({
                  behavior: 'smooth',
                  inline: 'start',
                  block: 'start',
                });
              });
              }
              break;


              case "19":
                {
                  let resultRequest;
                  await this.clientService
                    .getNumberOfCltNotInZone()
                    .toPromise()
                    .then((data) => {
                      console.log("resultat ", data);
                      resultRequest = data;
                    
                  if (resultRequest > 0) {
                    obj.etat = this.etat[1].def;
                    obj.couleur = this.etat[1].style;
                  } else {
                    obj.etat = this.etat[0].def;
                    obj.couleur = this.etat[0].style;
                  }
                  document
                  .getElementById(`row_code${obj.rang}`)
                  .scrollIntoView({
                    behavior: 'smooth',
                    inline: 'start',
                    block: 'start',
                  });
                });
                }
                break;
              case "20":
                {
                  let resultRequest;
                  await this.sFamilleService
                    .getNumberOfSfmNotInFamille()
                    .toPromise()
                    .then((data) => {
                      console.log("resultat ", data);
                      resultRequest = data;
                  
                  if (resultRequest > 0) {
                    obj.etat = this.etat[1].def;
                    obj.couleur = this.etat[1].style;
                  } else {
                    obj.etat = this.etat[0].def;
                    obj.couleur = this.etat[0].style;
                  }
                  document
                  .getElementById(`row_code${obj.rang}`)
                  .scrollIntoView({
                    behavior: 'smooth',
                    inline: 'start',
                    block: 'start',
                  });
                });
                }
                break;
              case "21":
                {
                  let resultRequest;
                  await this.sFamilleService
                    .getNumberOfSfmNotInFamille()
                    .toPromise()
                    .then((data) => {
                      console.log("resultat ", data);
                      resultRequest = data;
                 
                  if (resultRequest > 0) {
                    obj.etat = this.etat[2].def;
                    obj.couleur = this.etat[2].style;
                  } else {
                    obj.etat = this.etat[0].def;
                    obj.couleur = this.etat[0].style;
                  }
                  document
                  .getElementById(`row_code${obj.rang}`)
                  .scrollIntoView({
                    behavior: 'smooth',
                    inline: 'start',
                    block: 'start',
                  });
                });
                }
                break;
              case "22":
                {
                  let resultRequest;
                  await this.clientService
                    .getNumberOfCltNotInZone()
                    .toPromise()
                    .then((data) => {
                      console.log("resultat ", data);
                      resultRequest = data;
                  
                  if (resultRequest > 0) {
                    obj.etat = this.etat[1].def;
                    obj.couleur = this.etat[1].style;
                  } else {
                    obj.etat = this.etat[0].def;
                    obj.couleur = this.etat[0].style;
                  }
                  document
                  .getElementById(`row_code${obj.rang}`)
                  .scrollIntoView({
                    behavior: 'smooth',
                    inline: 'start',
                    block: 'start',
                  });
                });
                }
                break;
              case "23":
                {
                  let resultRequest;
                  await this.sFamilleService
                    .getNumberOfSfmNotInFamille()
                    .toPromise()
                    .then((data) => {
                      console.log("resultat ", data);
                      resultRequest = data;
                  
                  if (resultRequest > 0) {
                    obj.etat = this.etat[1].def;
                    obj.couleur = this.etat[1].style;
                  } else {
                    obj.etat = this.etat[0].def;
                    obj.couleur = this.etat[0].style;
                  }
                  document
                  .getElementById(`row_code${obj.rang}`)
                  .scrollIntoView({
                    behavior: 'smooth',
                    inline: 'start',
                    block: 'start',
                  });
                });
                }
                break;
              case "24":
                {
                  let resultRequest;
                  await this.sFamilleService
                    .getNumberOfSfmNotInFamille()
                    .toPromise()
                    .then((data) => {
                      console.log("resultat ", data);
                      resultRequest = data;
                    
                  if (resultRequest > 0) {
                    obj.etat = this.etat[2].def;
                    obj.couleur = this.etat[2].style;
                  } else {
                    obj.etat = this.etat[0].def;
                    obj.couleur = this.etat[0].style;
                  }
                  document
                  .getElementById(`row_code${obj.rang}`)
                  .scrollIntoView({
                    behavior: 'smooth',
                    inline: 'start',
                    block: 'start',
                  });
                });
                }
                break;
              case "25":
                {
                  let resultRequest;
                  await this.clientService
                    .getNumberOfCltNotInZone()
                    .toPromise()
                    .then((data) => {
                      console.log("resultat ", data);
                      resultRequest = data;
                 
                  if (resultRequest > 0) {
                    obj.etat = this.etat[1].def;
                    obj.couleur = this.etat[1].style;
                  } else {
                    obj.etat = this.etat[0].def;
                    obj.couleur = this.etat[0].style;
                  }
                  document
                  .getElementById(`row_code${obj.rang}`)
                  .scrollIntoView({
                    behavior: 'smooth',
                    inline: 'start',
                    block: 'start',
                  });
                });
                }
                break;
              case "26":
                {
                  let resultRequest;
                  await this.sFamilleService
                    .getNumberOfSfmNotInFamille()
                    .toPromise()
                    .then((data) => {
                      console.log("resultat ", data);
                      resultRequest = data;
                   
                  if (resultRequest > 0) {
                    obj.etat = this.etat[1].def;
                    obj.couleur = this.etat[1].style;
                  } else {
                    obj.etat = this.etat[0].def;
                    obj.couleur = this.etat[0].style;
                  }
                  document
                  .getElementById(`row_code${obj.rang}`)
                  .scrollIntoView({
                    behavior: 'smooth',
                    inline: 'start',
                    block: 'start',
                  });
                });
                }
                break;
              case "27":
                {
                  let resultRequest;
                  await this.sFamilleService
                    .getNumberOfSfmNotInFamille()
                    .toPromise()
                    .then((data) => {
                      console.log("resultat ", data);
                      resultRequest = data;
                    
                  if (resultRequest > 0) {
                    obj.etat = this.etat[2].def;
                    obj.couleur = this.etat[2].style;
                  } else {
                    obj.etat = this.etat[0].def;
                    obj.couleur = this.etat[0].style;
                  }
                  document
                  .getElementById(`row_code${obj.rang}`)
                  .scrollIntoView({
                    behavior: 'smooth',
                    inline: 'start',
                    block: 'start',
                  });
                });
                }
                break;
    
    
              case "28":
                  {
                    let resultRequest;
                    await this.clientService
                      .getNumberOfCltNotInZone()
                      .toPromise()
                      .then((data) => {
                        console.log("resultat ", data);
                        resultRequest = data;
                      
                    if (resultRequest > 0) {
                      obj.etat = this.etat[1].def;
                      obj.couleur = this.etat[1].style;
                    } else {
                      obj.etat = this.etat[0].def;
                      obj.couleur = this.etat[0].style;
                    }
                    document
                    .getElementById(`row_code${obj.rang}`)
                    .scrollIntoView({
                      behavior: 'smooth',
                      inline: 'start',
                      block: 'start',
                    });
                  });
                  }
                  break;
                case "29":
                  {
                    let resultRequest;
                    await this.sFamilleService
                      .getNumberOfSfmNotInFamille()
                      .toPromise()
                      .then((data) => {
                        console.log("resultat ", data);
                        resultRequest = data;
                
                    if (resultRequest > 0) {
                      obj.etat = this.etat[1].def;
                      obj.couleur = this.etat[1].style;
                    } else {
                      obj.etat = this.etat[0].def;
                      obj.couleur = this.etat[0].style;
                    }
                    document
                    .getElementById(`row_code${obj.rang}`)
                    .scrollIntoView({
                      behavior: 'smooth',
                      inline: 'start',
                      block: 'start',
                    });
                  });
                  }
                  break;
                case "30":
                  {
                    let resultRequest;
                    await this.sFamilleService
                      .getNumberOfSfmNotInFamille()
                      .toPromise()
                      .then((data) => {
                        console.log("resultat ", data);
                        resultRequest = data;
                     
                    if (resultRequest > 0) {
                      obj.etat = this.etat[2].def;
                      obj.couleur = this.etat[2].style;
                    } else {
                      obj.etat = this.etat[0].def;
                      obj.couleur = this.etat[0].style;
                    }
                    document
                    .getElementById(`row_code${obj.rang}`)
                    .scrollIntoView({
                      behavior: 'smooth',
                      inline: 'start',
                      block: 'start',
                    });
                  });
                  }
                  break;
                case "31":
                  {
                    let resultRequest;
                    await this.clientService
                      .getNumberOfCltNotInZone()
                      .toPromise()
                      .then((data) => {
                        console.log("resultat ", data);
                        resultRequest = data;
                     
                    if (resultRequest > 0) {
                      obj.etat = this.etat[1].def;
                      obj.couleur = this.etat[1].style;
                    } else {
                      obj.etat = this.etat[0].def;
                      obj.couleur = this.etat[0].style;
                    }
                    document
                    .getElementById(`row_code${obj.rang}`)
                    .scrollIntoView({
                      behavior: 'smooth',
                      inline: 'start',
                      block: 'start',
                    });
                    });
                  }
                  break;
                case "32":
                  {
                    let resultRequest;
                    await this.sFamilleService
                      .getNumberOfSfmNotInFamille()
                      .toPromise()
                      .then((data) => {
                        console.log("resultat ", data);
                        resultRequest = data;
                      
                    if (resultRequest > 0) {
                      obj.etat = this.etat[1].def;
                      obj.couleur = this.etat[1].style;
                    } else {
                      obj.etat = this.etat[0].def;
                      obj.couleur = this.etat[0].style;
                    }
                    document
                    .getElementById(`row_code${obj.rang}`)
                    .scrollIntoView({
                      behavior: 'smooth',
                      inline: 'start',
                      block: 'start',
                    });
                   });
                  }
                  break;
                case "33":
                  {
                    let resultRequest;
                    await this.sFamilleService
                      .getNumberOfSfmNotInFamille()
                      .toPromise()
                      .then((data) => {
                        console.log("resultat ", data);
                        resultRequest = data;
                     
                    if (resultRequest > 0) {
                      obj.etat = this.etat[2].def;
                      obj.couleur = this.etat[2].style;
                    } else {
                      obj.etat = this.etat[0].def;
                      obj.couleur = this.etat[0].style;
                    }
                    document
                    .getElementById(`row_code${obj.rang}`)
                    .scrollIntoView({
                      behavior: 'smooth',
                      inline: 'start',
                      block: 'start',
                    });
                  });
                  }
                  break;
                case "34":
                  {
                    let resultRequest;
                    await this.clientService
                      .getNumberOfCltNotInZone()
                      .toPromise()
                      .then((data) => {
                        console.log("resultat ", data);
                        resultRequest = data;
                   
                    if (resultRequest > 0) {
                      obj.etat = this.etat[1].def;
                      obj.couleur = this.etat[1].style;
                    } else {
                      obj.etat = this.etat[0].def;
                      obj.couleur = this.etat[0].style;
                    }
                    document
                    .getElementById(`row_code${obj.rang}`)
                    .scrollIntoView({
                      behavior: 'smooth',
                      inline: 'start',
                      block: 'start',
                    });
                  });
                  }
                  break;
                case "35":
                  {
                    let resultRequest;
                    await this.sFamilleService
                      .getNumberOfSfmNotInFamille()
                      .toPromise()
                      .then((data) => {
                        console.log("resultat ", data);
                        resultRequest = data;
                     
                    if (resultRequest > 0) {
                      obj.etat = this.etat[1].def;
                      obj.couleur = this.etat[1].style;
                    } else {
                      obj.etat = this.etat[0].def;
                      obj.couleur = this.etat[0].style;
                    }
                    document
                    .getElementById(`row_code${obj.rang}`)
                    .scrollIntoView({
                      behavior: 'smooth',
                      inline: 'start',
                      block: 'start',
                    });
                    });
                  }
                  break;
                case "36":
                  {
                    let resultRequest;
                    await this.sFamilleService
                      .getNumberOfSfmNotInFamille()
                      .toPromise()
                      .then((data) => {
                        console.log("resultat ", data);
                        resultRequest = data;
                      
                    if (resultRequest > 0) {
                      obj.etat = this.etat[2].def;
                      obj.couleur = this.etat[2].style;
                    } else {
                      obj.etat = this.etat[0].def;
                      obj.couleur = this.etat[0].style;
                    }
                    document
                    .getElementById(`row_code${obj.rang}`)
                    .scrollIntoView({
                      behavior: 'smooth',
                      inline: 'start',
                      block: 'start',
                    });
                    });
                  }
                  break;


                  case "37":
                    {
                      let resultRequest;
                      await this.clientService
                        .getNumberOfCltNotInZone()
                        .toPromise()
                        .then((data) => {
                          console.log("resultat ", data);
                          resultRequest = data;
                       
                      if (resultRequest > 0) {
                        obj.etat = this.etat[1].def;
                        obj.couleur = this.etat[1].style;
                      } else {
                        obj.etat = this.etat[0].def;
                        obj.couleur = this.etat[0].style;
                      }
                      document
                      .getElementById(`row_code${obj.rang}`)
                      .scrollIntoView({
                        behavior: 'smooth',
                        inline: 'start',
                        block: 'start',
                      });
                    });
                    }
                    break;
                  case "38":
                    {
                      let resultRequest;
                      await this.clientService
                        .getNumberOfCltNotInZone()
                        .toPromise()
                        .then((data) => {
                          console.log("resultat ", data);
                          resultRequest = data;
                        
                      if (resultRequest > 0) {
                        obj.etat = this.etat[1].def;
                        obj.couleur = this.etat[1].style;
                      } else {
                        obj.etat = this.etat[0].def;
                        obj.couleur = this.etat[0].style;
                      }
                      document
                      .getElementById(`row_code${obj.rang}`)
                      .scrollIntoView({
                        behavior: 'smooth',
                        inline: 'start',
                        block: 'start',
                      });
                    });
                    }
                    break;
                  case "39":
                    {
                      let resultRequest;
                      await this.sFamilleService
                        .getNumberOfSfmNotInFamille()
                        .toPromise()
                        .then((data) => {
                          console.log("resultat ", data);
                          resultRequest = data;
                      
                      if (resultRequest > 0) {
                        obj.etat = this.etat[2].def;
                        obj.couleur = this.etat[2].style;
                      } else {
                        obj.etat = this.etat[0].def;
                        obj.couleur = this.etat[0].style;
                      }
                      document
                      .getElementById(`row_code${obj.rang}`)
                      .scrollIntoView({
                        behavior: 'smooth',
                        inline: 'start',
                        block: 'start',
                      });
                      });
                    }
                    break;
                  case "40":
                    {
                      let resultRequest;
                      await this.clientService
                        .getNumberOfCltNotInZone()
                        .toPromise()
                        .then((data) => {
                          console.log("resultat ", data);
                          resultRequest = data;
                      
                      if (resultRequest > 0) {
                        obj.etat = this.etat[1].def;
                        obj.couleur = this.etat[1].style;
                      } else {
                        obj.etat = this.etat[0].def;
                        obj.couleur = this.etat[0].style;
                      }
                      document
                      .getElementById(`row_code${obj.rang}`)
                      .scrollIntoView({
                        behavior: 'smooth',
                        inline: 'start',
                        block: 'start',
                      });
                    });
                    }
                    break;
                  case "41":
                    {
                      let resultRequest;
                      await this.sFamilleService
                        .getNumberOfSfmNotInFamille()
                        .toPromise()
                        .then((data) => {
                          console.log("resultat ", data);
                          resultRequest = data;
                       
                      if (resultRequest > 0) {
                        obj.etat = this.etat[1].def;
                        obj.couleur = this.etat[1].style;
                      } else {
                        obj.etat = this.etat[0].def;
                        obj.couleur = this.etat[0].style;
                      }
                      document
                      .getElementById(`row_code${obj.rang}`)
                      .scrollIntoView({
                        behavior: 'smooth',
                        inline: 'start',
                        block: 'start',
                      });
                     });
                    }
                    break;
                  case "42":
                    {
                      let resultRequest;
                      await this.clientService
                        .getNumberOfCltNotInZone()
                        .toPromise()
                        .then((data) => {
                          console.log("resultat ", data);
                          resultRequest = data;
                       
                      if (resultRequest > 0) {
                        obj.etat = this.etat[1].def;
                        obj.couleur = this.etat[1].style;
                      } else {
                        obj.etat = this.etat[0].def;
                        obj.couleur = this.etat[0].style;
                      }
                      document
                      .getElementById(`row_code${obj.rang}`)
                      .scrollIntoView({
                        behavior: 'smooth',
                        inline: 'start',
                        block: 'start',
                      });
                    });
                    }
                    break;
                  case "43":
                    {
                      let resultRequest;
                      await this.clientService
                        .getNumberOfCltNotInZone()
                        .toPromise()
                        .then((data) => {
                          console.log("resultat ", data);
                          resultRequest = data;
                      
                      if (resultRequest > 0) {
                        obj.etat = this.etat[1].def;
                        obj.couleur = this.etat[1].style;
                      } else {
                        obj.etat = this.etat[0].def;
                        obj.couleur = this.etat[0].style;
                      }
                      document
                      .getElementById(`row_code${obj.rang}`)
                      .scrollIntoView({
                        behavior: 'smooth',
                        inline: 'start',
                        block: 'start',
                      });
                    });
                    }
                    break;
                  case "44":
                    {
                      let resultRequest;
                      await this.sFamilleService
                        .getNumberOfSfmNotInFamille()
                        .toPromise()
                        .then((data) => {
                          console.log("resultat ", data);
                          resultRequest = data;
                      
                      if (resultRequest > 0) {
                        obj.etat = this.etat[1].def;
                        obj.couleur = this.etat[1].style;
                      } else {
                        obj.etat = this.etat[0].def;
                        obj.couleur = this.etat[0].style;
                      }
                      document
                      .getElementById(`row_code${obj.rang}`)
                      .scrollIntoView({
                        behavior: 'smooth',
                        inline: 'start',
                        block: 'start',
                      });
                    });
                    }
                    break;
                  case "45":
                    {
                      let resultRequest;
                      await this.sFamilleService
                        .getNumberOfSfmNotInFamille()
                        .toPromise()
                        .then((data) => {
                          console.log("resultat ", data);
                          resultRequest = data;
                      
                      if (resultRequest > 0) {
                        obj.etat = this.etat[2].def;
                        obj.couleur = this.etat[2].style;
                      } else {
                        obj.etat = this.etat[0].def;
                        obj.couleur = this.etat[0].style;
                      }
                      document
                      .getElementById(`row_code${obj.rang}`)
                      .scrollIntoView({
                        behavior: 'smooth',
                        inline: 'start',
                        block: 'start',
                      });
                    });
                    }
                    break;
        
        
                  case "46":
                      {
                        let resultRequest;
                        await this.clientService
                          .getNumberOfCltNotInZone()
                          .toPromise()
                          .then((data) => {
                            console.log("resultat ", data);
                            resultRequest = data;
                        
                        if (resultRequest > 0) {
                          obj.etat = this.etat[1].def;
                          obj.couleur = this.etat[1].style;
                        } else {
                          obj.etat = this.etat[0].def;
                          obj.couleur = this.etat[0].style;
                        }
                        document
                        .getElementById(`row_code${obj.rang}`)
                        .scrollIntoView({
                          behavior: 'smooth',
                          inline: 'start',
                          block: 'start',
                        });
                      });
                      }
                      break;
                    case "47":
                      {
                        let resultRequest;
                        await this.sFamilleService
                          .getNumberOfSfmNotInFamille()
                          .toPromise()
                          .then((data) => {
                            console.log("resultat ", data);
                            resultRequest = data;
                          
                        if (resultRequest > 0) {
                          obj.etat = this.etat[1].def;
                          obj.couleur = this.etat[1].style;
                        } else {
                          obj.etat = this.etat[0].def;
                          obj.couleur = this.etat[0].style;
                        }
                        document
                        .getElementById(`row_code${obj.rang}`)
                        .scrollIntoView({
                          behavior: 'smooth',
                          inline: 'start',
                          block: 'start',
                        });
                      });
                      }
                      break;
                    case "48":
                      {
                        let resultRequest;
                        await this.sFamilleService
                          .getNumberOfSfmNotInFamille()
                          .toPromise()
                          .then((data) => {
                            console.log("resultat ", data);
                            resultRequest = data;
                         
                        if (resultRequest > 0) {
                          obj.etat = this.etat[2].def;
                          obj.couleur = this.etat[2].style;
                        } else {
                          obj.etat = this.etat[0].def;
                          obj.couleur = this.etat[0].style;
                        }
                        document
                        .getElementById(`row_code${obj.rang}`)
                        .scrollIntoView({
                          behavior: 'smooth',
                          inline: 'start',
                          block: 'start',
                        });
                      });
                      }
                      break;
                    case "49":
                      {
                        let resultRequest;
                        await this.clientService
                          .getNumberOfCltNotInZone()
                          .toPromise()
                          .then((data) => {
                            console.log("resultat ", data);
                            resultRequest = data;
                         
                        if (resultRequest > 0) {
                          obj.etat = this.etat[1].def;
                          obj.couleur = this.etat[1].style;
                        } else {
                          obj.etat = this.etat[0].def;
                          obj.couleur = this.etat[0].style;
                        }
                       document
                        .getElementById(`row_code${obj.rang}`)
                        .scrollIntoView({
                          behavior: 'smooth',
                          inline: 'start',
                          block: 'start',
                        });
                      });
                      
                      }
                      break;
                    case "50":
                      {
                        let resultRequest;
                        await this.sFamilleService
                          .getNumberOfSfmNotInFamille()
                          .toPromise()
                          .then((data) => {
                            console.log("resultat ", data);
                            resultRequest = data;
                       
                        if (resultRequest > 0) {
                          obj.etat = this.etat[1].def;
                          obj.couleur = this.etat[1].style;
                        } else {
                          obj.etat = this.etat[0].def;
                          obj.couleur = this.etat[0].style;
                        }
                        document
                        .getElementById(`row_code${obj.rang}`)
                        .scrollIntoView({
                          behavior: 'smooth',
                          inline: 'start',
                          block: 'start',
                        });
                      });
                      }
                      break;
                    case "51":
                      {
                        let resultRequest;
                        await this.sFamilleService
                          .getNumberOfSfmNotInFamille()
                          .toPromise()
                          .then((data) => {
                            console.log("resultat ", data);
                            resultRequest = data;
                       
                        if (resultRequest > 0) {
                          obj.etat = this.etat[2].def;
                          obj.couleur = this.etat[2].style;
                        } else {
                          obj.etat = this.etat[0].def;
                          obj.couleur = this.etat[0].style;
                        }
                        document
                        .getElementById(`row_code${obj.rang}`)
                        .scrollIntoView({
                          behavior: 'smooth',
                          inline: 'start',
                          block: 'start',
                        });
                      });
                      }
                      break;
                    case "52":
                      {
                        let resultRequest;
                        await this.clientService
                          .getNumberOfCltNotInZone()
                          .toPromise()
                          .then((data) => {
                            console.log("resultat ", data);
                            resultRequest = data;
                          
                        if (resultRequest > 0) {
                          obj.etat = this.etat[1].def;
                          obj.couleur = this.etat[1].style;
                        } else {
                          obj.etat = this.etat[0].def;
                          obj.couleur = this.etat[0].style;
                        }
                        document
                        .getElementById(`row_code${obj.rang}`)
                        .scrollIntoView({
                          behavior: 'smooth',
                          inline: 'start',
                          block: 'start',
                        });
                      });
                      }
                      break;
                    case "53":
                      {
                        let resultRequest;
                        await this.sFamilleService
                          .getNumberOfSfmNotInFamille()
                          .toPromise()
                          .then((data) => {
                            console.log("resultat ", data);
                            resultRequest = data;
                         
                        if (resultRequest > 0) {
                          obj.etat = this.etat[1].def;
                          obj.couleur = this.etat[1].style;
                        } else {
                          obj.etat = this.etat[0].def;
                          obj.couleur = this.etat[0].style;
                        }
                        document
                        .getElementById(`row_code${obj.rang}`)
                        .scrollIntoView({
                          behavior: 'smooth',
                          inline: 'start',
                          block: 'start',
                        });
                      });
                      }
                      break;
                    case "54":
                      {
                        let resultRequest;
                        await this.sFamilleService
                          .getNumberOfSfmNotInFamille()
                          .toPromise()
                          .then((data) => {
                            console.log("resultat ", data);
                            resultRequest = data;
                         
                        if (resultRequest > 0) {
                          obj.etat = this.etat[2].def;
                          obj.couleur = this.etat[2].style;
                        } else {
                          obj.etat = this.etat[0].def;
                          obj.couleur = this.etat[0].style;
                        }
                        document
                        .getElementById(`row_code${obj.rang}`)
                        .scrollIntoView({
                          behavior: 'smooth',
                          inline: 'start',
                          block: 'start',
                        });
                      });
                      }
                      break;




          default: {
          }
        }
        }
      }
      this.wait(0).then( () => {
        this.isLoading = false;
        this.hiddenBtnExecuter = true;
        this.hiddenBtnAppercu = false;
       this.hiddenBtnNouvelSaisie = false;
        
       });
      
      console.log("la liste selectionnée apres ", this.selectedContraintes);
      
    }
  }
  

async appercu(e) {
    /// créer doc jspdf
    const doc1 =new jsPDF();
    doc1.setFontSize(12);
    doc1.setFontStyle('Arial');
    const titre = 'Rapport d\'analyse des contraintes d\'intégrité ' ;
    let liste = this.selectedContraintes.sort((cnt1, cnt2) => {
      if (Number(cnt1.rang) > Number(cnt2.rang)) {
        return 1;
      }
      if (cnt1.rang < cnt2.rang) {
        return -1;
      }
      return 0;
    });

    
       console.log('liiiiiste a exportee en pdf ', liste );
  
  
 
    this.societe = globals.societe;
  
   doc1.text('SOCIETE.:  ' + this.societe, 9, 15);
   doc1.text('Le : ' + new Date().toLocaleDateString('en-GB') , 170, 20) ;
   doc1.setFontSize(22);
   doc1.setFontStyle('bold');
   doc1.setFontStyle('Arial');
  
   doc1.setTextColor(0, 51, 153);
   doc1.text(titre, 50, 30);
   doc1.setTextColor(48, 48, 48);
   doc1.setFontSize(12);
   doc1.setFontStyle('bold');
 //  doc1.setFontStyle('Arial');
 
  
   doc1.text('Utilisateur :   '+localStorage.getItem('login')  , 9, 40) ;
   doc1.setTextColor(253,0,0);
   doc1.text(this.msgInterruption , 60, 55) ;
   /// entete tableau
   doc1.setFontSize(15);
   doc1.setFontStyle('bold');
   doc1.line(9, 60, 205, 60);

   doc1.setDrawColor(0);
   doc1.setFillColor(176,224,230);
   doc1.rect(9, 60, 196, 10, 'FD');
   doc1.setTextColor(48, 48, 48);
     doc1.text('Nom', 10, 68);
     doc1.text('Etat ', 155, 68);
     doc1.line(9, 70, 205, 70);

     //// cors du tableau
     let y = 80;
    
     let numPage = 1;
     for (const obj of liste) {
      doc1.setFontSize(12);
      doc1.setFontStyle('Arial');
       if (obj.nom !== null && obj.nom !== undefined  ) {
        doc1.text(obj.nom, 11, y);
       } else {
        obj.nom = '';
       }
       doc1.setFontStyle('bold')
       if (obj.etat !== null && obj.etat !== undefined ) {
         let etat = obj.etat.substring(2,obj.etat.length);
         if(etat === 'Pas d\'erreur'){
          doc1.setTextColor(0, 150, 0);
         }else{
          if(etat === ' Erreur non grave'){
            etat ='Erreur non grave'+'';
            doc1.setTextColor(255,140,0);
           }else{
             if(etat === 'Erreur grave '){
              etat ='Erreur grave';
              doc1.setTextColor(250, 0, 0);
           }
          }
         }
       
      
        doc1.text(etat, 156, y);
        doc1.setFontStyle('Arial');
        doc1.setTextColor(48, 48, 48);
       } else {
        obj.etat = '';
       }
        y = y + 7;

 
        if(numPage === 1){
            doc1.line(9, 60, 9, 280);
          //   y = y + 3;
        // doc1.line(9, y, 9, y  );
          doc1.line(205, 60, 205, 280 );
        }else{
          doc1.line(9, 12, 9, 280);
          //   y = y + 3;
        // doc1.line(9, y, 9, y  );
          doc1.line(205, 12, 205, 280 );
        }

 
     if (y > 277) {
    // numero page
      doc1.setFontStyle('bold');
      doc1.line(9, 280, 205, 280, 'FD');
      doc1.setFontSize(12);
      doc1.text('Page ' + numPage.toFixed(0), 100, 289);
        numPage ++;
       doc1.addPage();
      // header page > 1

       doc1.line(9, 12, 205, 12);
       doc1.setFontSize(15);
       doc1.setFontStyle('bold');
       doc1.setDrawColor(0);
       doc1.setFillColor(176,224,230);
       doc1.rect(9, 12, 196, 10, 'FD');
       doc1.text('Nom', 10, 19);
       doc1.text('Etat', 155, 19);
     // creer la ligne
         doc1.line(9, 22, 205, 22);
       y = 29;

       }


     }
      
        doc1.setFontSize(12);
        doc1.setFontStyle('bold');
     
        doc1.line(9, 280, 205, 280, 'FD');
        doc1.setFontSize(12);
        doc1.text('Page ' + numPage.toFixed(0), 100, 287 + 2);
  
     window.open(doc1.output('bloburl'), '_blank');
  
  }









}
