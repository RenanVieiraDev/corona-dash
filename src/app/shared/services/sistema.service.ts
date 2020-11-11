import { Injectable } from '@angular/core';
import { Grafico } from '../models/grafico.model';

@Injectable({
  providedIn: 'root'
})
export class SistemaService {

  constructor() { }

  public getListaEstadosBrasileiros():Array<object>{
    return [
      {state:'Pernambuco',uf:'pe'},{state:'Acre',uf:'ac'},{state:'Alagoas',uf:'al'},{state:'Amapá',uf:'ap'},
      {state:'Amazonas',uf:'am'},{state:'Bahia',uf:'ba'},{state:'Ceará',uf:'ce'},{state:'Distrito Federal',uf:'df'},
      {state:'Espírito Santo',uf:'es'},{state:'Goiás',uf:'go'},{state:'Maranhão',uf:'ma'},
      {state:'Mato Grosso',uf:'mt'},{state:'Mato Grosso do Sul',uf:'ms'},{state:'Minas Gerais',uf:'mg'},
      {state:'Pará',uf:'pr'},{state:'Paraíba',uf:'pb'},{state:'Paraná',uf:'pr'},
      {state:'Piauí',uf:'pi'},{state:'Rio de Janeiro',uf:'rj'},
      {state:'Rio Grande do Norte',uf:'rn'},{state:'Rio Grande do Sul',uf:'rs'},{state:'Rondônia',uf:'ro'},
      {state:'Roraima',uf:'rr'},{state:'Santa Catarina',uf:'sc'},{state:'São Paulo',uf:'sp'},
      {state:'Sergipe',uf:'se'},{state:'Tocantins',uf:'to'}
    ]
  }

  public montaDadosParaGraficos(dados):Grafico{
    let grafico = new Grafico();
    for(let key in dados){
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      let corBG = `rgba(${r}, ${g}, ${b}, 0.9)`;
      let corBordas = `rgba(${r}, ${g}, ${b}, .1)`;
      grafico.labels[key] = dados[key]['uf'];
      grafico.dataInfectado[key] = dados[key]['cases'];
      grafico.dataMortes[key] = dados[key]['deaths'];
      grafico.dataSuspeitos[key] = dados[key]['suspects'];
      grafico.dataNegados[key]= dados[key]['refuses'];
      grafico.backgroundColor[key] = corBG;
      grafico.borderColor[key] = corBordas;
      grafico.dataTime[key] = dados[key]['datetime'];
      grafico.stats[key] = dados[key]['state'];
    }
    return grafico;
  }
  
}
