import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlucoService } from 'src/app/service/gluco.service';
import { Chart, registerables } from 'chart.js';



@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  cedula!: string;
  fechaInicio: string = "0000-00-00";
  fechaFin: string = "0000-00-00";
  ListaGlucometria: any[] = []; // Inicializar como un array vacío
  chart: any;
  chartId: any;
  public user: any;
  public datosDisponibles: boolean = false;


  constructor(private glucoService: GlucoService, private router: Router, private fb: FormBuilder) {
    this.user = JSON.parse(sessionStorage.getItem('user') ?? '');


  }

  range = new FormGroup({
    inicio: new FormControl<Date | null>(null),
    fin: new FormControl<Date | null>(null),
  });

  ngOnInit(): void {
    Chart.register(...registerables);
    this.range.valueChanges.subscribe(() => {
      this.listaFecha();
    });

    // Llamar a listaFecha() inicialmente para renderizar el gráfico vacío
    this.listaFecha();
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  listaFecha(): void {
    const inicio = this.range.controls.inicio.value;
    const fin = this.range.controls.fin.value;
  
    if (inicio && fin) {
      this.fechaInicio = this.formatDate(inicio);
      this.fechaFin = this.formatDate(fin);
  
      this.cedula = this.user.cedula;
      this.glucoService.listaFecha(this.fechaInicio, this.fechaFin, this.cedula).subscribe(
        data => {
          this.ListaGlucometria = data;
          console.log('lista', data);
          this.datosDisponibles = true; // Marcar como true si hay datos disponibles
          this.renderChart();
        },
        error => {
          console.log('Error al obtener los datos', error);
          this.datosDisponibles = false; // Marcar como false si ocurre un error al obtener los datos
          this.renderChart(); // Renderizar el gráfico incluso si no hay datos
        }
      );
    }else {
      this.ListaGlucometria = []; // Asignar una lista vacía cuando no hay fechas
      this.glucoService.listaFecha(this.fechaInicio, this.fechaFin, this.cedula).subscribe(
        data => {
          this.ListaGlucometria = data;
          console.log('lista', data);
          this.datosDisponibles = true; // Marcar como true si hay datos disponibles
          this.renderChart();
        },
        error => {
          console.log('Error al obtener los datos', error);
          this.datosDisponibles = false; // Marcar como false si ocurre un error al obtener los datos
          this.renderChart(); // Renderizar el gráfico incluso si no hay datos
        }
      );
    }
  }

  renderChart(): void {
    // Destruir el gráfico existente si hay uno
    if (this.chart) {
      this.chart.destroy();
    }

    const labels = this.ListaGlucometria.map(item => item.dia);
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
              text: 'Dia'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Valor de glucosa'
            },
            suggestedMin: 0,
            suggestedMax: 400
          }
        }
      }
    });
  }

  volver(): void {
    this.router.navigate(['/inicio']);
  }
}
