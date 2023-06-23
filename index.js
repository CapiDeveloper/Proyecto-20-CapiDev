const divSpinner = document.getElementById('spinner');
const contenedorTarjeta = document.getElementById('contenedor');

if('geolocation' in navigator){
    navigator.geolocation.watchPosition(position=>{
        
        const {latitude,longitude} = position.coords;
        verClima(latitude,longitude);

    },()=>{
        console.log('Permiso no aceptado');
    })
}else{
    alert('No soporta la geolocalicación')
}

async function verClima(latitude,longitude) {
    try {
       const respuesta =   await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e78fcf93c4157bb0e84bb8ccf7f15dfa`)
        const data = await respuesta.json();

        const {icon,description} = data.weather[0];
        const temperatura = data.main.temp - 273.15;

        const {temp_max,temp_min} = data.main;
        const pais = data.sys.country;
        
        // Desaparecer el spinner
        divSpinner.classList.add('d-none');
        // Aparecer tarjeta
        contenedorTarjeta.classList.add('contenedor')
        // Agregar info en la tarjeta
        document.getElementById('temperatura').textContent = Math.floor(temperatura) + ' °C'
        document.getElementById('icono').src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        document.getElementById('descripcion').textContent = description;
        document.getElementById('pais').textContent = pais;
        document.getElementById('temp_max').textContent = Math.floor(temp_max - 273.15);
        document.getElementById('temp_min').textContent = Math.floor(temp_min - 273.15);

    } catch (error) {
        console.log(error);
    }
}