import { Component, OnInit, ViewChild } from '@angular/core';

import { Chart } from 'chart.js';

//services
import { SistemaService } from '../../shared/services/sistema.service';
import { ResponseAPIService } from '../../shared/services/response-api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('graficoGeralInfectados',{ static:true}) graficoGeralInfectados:Element;
  @ViewChild('graficoGeralMortes',{ static:true}) graficoGeralMortes:Element;
  @ViewChild('estadoInfoMobile',{ static:true}) estadoInfoMobileSelect:Element;
  public estadosBrasil:Array<object> = null;
  public listaDeTodosOsEstados:Array<any> = [];
  public estadoAtualInfo:object;

  constructor(
      public sistemaService:SistemaService,
      public API:ResponseAPIService
      ) {
        this.estadosBrasil = this.sistemaService.getListaEstadosBrasileiros();
       }

  ngOnInit() {
    
    this.API.getListaCasosPorTodosEstadosBrasileiros().subscribe(res=>{
        for(let key in res.data){this.listaDeTodosOsEstados.push(res.data[key])}
        this.constroiGraficos(
            this.graficoGeralInfectados['nativeElement']
            ,{tipo:'bar',label:'Infectados',tipoData:'dataInfectado'}
            ,this.sistemaService.montaDadosParaGraficos(this.listaDeTodosOsEstados)
        );
        this.constroiGraficos(
            this.graficoGeralMortes['nativeElement']
            ,{tipo:'bar',label:'Mortes',tipoData:'dataMortes'}
            ,this.sistemaService.montaDadosParaGraficos(this.listaDeTodosOsEstados)
        );
    })
    this.pegaInformacoesDoEstado('pe');
  }
  

  
  public constroiGraficos(canvas,tipo,dados):void{
   new Chart(canvas,
   {
    type: tipo['tipo'],
    data: {
        labels: dados['labels'],
        datasets: [{
            label: tipo['label'],
            data: dados[tipo['tipoData']],
            backgroundColor: dados['backgroundColor'],
            borderColor: dados['borderColor'],
            borderWidth: dados['borderWidth']
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
    });
  }

  public pegaInformacoesDoEstado(stats):void{
    this.estadoAtualInfo = null;
    this.API.getInforDoEstado(stats).subscribe(res=>{
        this.estadoAtualInfo = res;
        //console.log(this.estadoAtualInfo)
    })
  }

  public mudaEstadoInfoMobile():void{
      this.pegaInformacoesDoEstado(this.estadoInfoMobileSelect['nativeElement']['value'])
  }

  

}
