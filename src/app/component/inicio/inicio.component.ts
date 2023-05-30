import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { GlucoService } from 'src/app/service/gluco.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  cedula!: string;
  ListaGlucometria!: any[];
  chart: any;
  public user: any;

  constructor(private glucoService: GlucoService, private router: Router) {
    this.user = JSON.parse(sessionStorage.getItem('user') ?? '');
  }

  ngOnInit(): void {
    Chart.register(...registerables);
    this.lista24H();
  }

  lista24H(): void {
    this.cedula = this.user.cedula;
    this.glucoService.lista24h(this.cedula).subscribe(
      data => {
        this.ListaGlucometria = data;
        console.log('lista', data);
        this.renderChart();
      },
      error => {
        console.log('Error al obtener los datos', error);
      }
    );
  }

  renderChart(): void {
    const labels = this.ListaGlucometria.map(item => item.hora);
    const data = this.ListaGlucometria.map(item => item.glucometria);
    const backgroundColors = data.map(value => {
      if (value < 70 || value > 180) {
        return 'red';
      } else {
        return 'rgba(0, 0, 255, 0.2)';
      }
    });
  
    const ctx = document.getElementById('chart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Valores de glucosa',
            data: data,
            borderColor: 'blue',
            backgroundColor: backgroundColors,
            fill: 'origin'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Hora'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Valor de glucosa'
            },
            suggestedMin: 0,
            suggestedMax: 200
          }
        }
      }
    });
  }

  irARegistro(): void {
    this.router.navigate(['/inicio/registro']);
  }

  irAHistorial(): void {
    this.router.navigate(['/inicio/historial']);
  }
}