let mesigrafico = [];
const ctx = document.getElementById('myChart');
const loadGraph = () => {
fetch('/totalExpensesbyYearandMonth')
.then(response => response.json())
.then(dati => {
    //replace the number of the month with the name of the month
    dati.forEach(d => {
        console.log(d[0]);
        switch(d[0]){
            case '01':
                d[0] = 'Gennaio';
                break;
            case '02':
                d[0] = 'Febbraio';
                break;
            case '03':
                d[0] = 'Marzo';
                break;
            case '04':
                d[0] = 'Aprile';
                break;
            case '05':
                d[0] = 'Maggio';
                break;
            case '06':
                d[0] = 'Giugno';
                break;
            case '07':
                d[0] = 'Luglio';
                break;
            case '08':
                d[0] = 'Agosto';
                break;
            case '09':
                d[0] = 'Settembre';
                break;
            case '10':
                d[0] = 'Ottobre';
                break;
            case '11':
                d[0] = 'Novembre';
                break;
            case '12':
                d[0] = 'Dicembre';
                break;
        }
    })
    datipergrafico = dati;
    const data = {
        labels: datipergrafico.map(d => d[0] + ' ' + d[1]),
        datasets: [
          {
            label: 'Spese Mensili',
            data: datipergrafico.map(d => d[2]),
            borderColor: 'rgba(255,191,0, 1)',
            backgroundColor: 'rgba(255,191,0, 0.2)',
            tension: 0.1,
            fill:false
          }
        ]
      };
    const config = {
        type: 'line',
        data: data,
        options: {
          animations: {
            tension: {
              duration: 1000,
              easing: 'linear',
              from: 1,
              to: 0,
              loop: true
            }
          },
          scales: {
            y: { // defining min and max so hiding the dataset does not change scale range
              min: 0,
              max: 100
            }
          }
        }
      };
        new Chart(
            ctx,
            config
        );
})

}
/*

const data = {
    
  };
const config = {
    type: 'line',
    data: data,
    options: {
      animations: {
        tension: {
          duration: 1000,
          easing: 'linear',
          from: 1,
          to: 0,
          loop: true
        }
      },
      scales: {
        y: { // defining min and max so hiding the dataset does not change scale range
          min: 0,
          max: 100
        }
      }
    }
  };
    new Chart(
        document.getElementById('myChart'),
        config
    );*/