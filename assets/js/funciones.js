const infoIndividual = document.getElementById('info-individual');
const canchaItems = document.querySelectorAll('.canchas__item');

function generarCodigoReserva() {
    const palabras = [
        "gol", "cancha", "raqueta", "equipo", "torneo", "partido", "jugada", "punto", "set", "match",
        "pase", "ataque", "defensa", "arco", "balón", "pelota", "campeón", "final", "victoria", "derrota",
        "empate", "saque", "red", "portería", "penal", "árbitro", "jugador", "capitán", "técnico", "entrenador",
        "club", "liga", "amistoso", "profesional", "juvenil", "golazo", "tiro", "paseo", "estrategia", "táctica",
        "fuerza", "rapidez", "habilidad", "destreza", "rendimiento", "competencia", "pretemporada", "calentamiento", "resistencia", "velocidad",
        "drible", "pivote", "delantero", "defensor", "portero", "lateral", "mediocampo", "volante", "suplente", "titular",
        "uniforme", "botines", "cinta", "bandera", "silbato", "golpe", "remate", "rechazo", "bloqueo", "atajada",
        "servicio", "marcador", "resultado", "torneo", "campeonato", "liga", "division", "playoff", "fase", "grupo",
        "balonazo", "tiempo", "prórroga", "descanso", "cambio", "alineación", "banquillo", "banco", "afición", "hinchada",
        "barra", "tribuna", "gradería", "estadio", "arena", "pista", "campo", "césped", "grama", "césped-artificial",
        "competidor", "rival", "contrincante", "enemigo", "amistad", "fairplay", "respeto", "reglamento", "norma", "sanción",
        "tarjeta", "amarilla", "roja", "falta", "infracción", "castigo", "multas", "suspensión", "apelación", "autogol",
        "jugada-maestra", "estreno", "histórico", "leyenda", "figura", "estrella", "icono", "ídolo", "fanático", "aplausos",
        "celebración", "victorioso", "triunfo", "gloria", "corona", "medalla", "trofeo", "copa", "premio", "diploma",
        "selección", "nacional", "internacional", "continental", "mundial", "regional", "local", "delegación", "representante", "delegado",
        "árbitros", "juez", "comité", "organizador", "directivo", "presidente", "gerente", "coordinador", "patrocinador", "auspicio",
        "publicidad", "merchandising", "marketing", "venta", "boleto", "entrada", "ticket", "acceso", "ingreso", "puerta",
        "taquilla", "venta-online", "reservación", "turno", "agenda", "cita", "programa", "horario", "calendario", "disponibilidad",
        "ocupado", "confirmado", "cancelado", "activo", "espera", "fila", "cola", "turnero", "gestión", "organización",
        "administración", "planificación", "coordinación", "evento", "fiesta", "celebración", "encuentro", "reunión", "convocatoria", "campus"
    ];
    const palabra = palabras[Math.floor(Math.random() * palabras.length)];
    const numeros = Math.floor(1000 + Math.random() * 9000);
    return `${palabra}-${numeros}`;
}

function renderFormulario(deporte) {
    fetch('./assets/json/datos.json')
        .then(response => response.json())
        .then(data => {
            const deporteData = data.deportes.find(d => d.nombre === deporte);
            if (!deporteData) return;

            const canchasOptions = deporteData.canchas.map(cancha =>
                `<option value="${cancha.nombre}">${cancha.nombre}</option>`
            ).join('');

            const horarios = deporteData.canchas[0].horarios_disponibles;
            const horariosOptions = horarios.map(h =>
                `<option value="${h}">${h}</option>`
            ).join('');

            let html = `
                <div class="info-card">
                    <h2>Reservar ${deporteData.nombre}</h2>
                    <button class="info-card__close">X</button>
                    <form class="reserva-form">
                        <div class="form-group">
                            <label for="nombre">Nombre:</label>
                            <input type="text" id="nombre" name="nombre" required>
                        </div>
                        <div class="form-group">
                            <label for="apellido">Apellido:</label>
                            <input type="text" id="apellido" name="apellido" required>
                        </div>
                        <div class="form-group">
                            <label for="dni">DNI:</label>
                            <input type="text" id="dni" name="dni" required>
                        </div>
                        <div class="form-group">
                            <label for="mail">Mail:</label>
                            <input type="email" id="mail" name="mail" required>
                        </div>
                        <div class="form-group">
                            <label for="deporte">Deporte:</label>
                            <input type="text" id="deporte" name="deporte" value="${deporteData.nombre}" readonly>
                        </div>
                        <div class="form-group">
                            <label for="hora">Seleccionar hora:</label>
                            <select id="hora" name="hora">${horariosOptions}</select>
                        </div>
                        <button type="submit" class="btn-reservar">Reservar</button>
                    </form>
                </div>
            `;

            infoIndividual.innerHTML = html;
            infoIndividual.classList.remove('hidden');

            document.querySelector('.info-card__close').addEventListener('click', () => {
                infoIndividual.classList.add('hidden');
            });

            document.querySelector('.reserva-form').addEventListener('submit', (e) => {
                e.preventDefault();
                const dataForm = {
                    nombre: document.getElementById('nombre').value,
                    apellido: document.getElementById('apellido').value,
                    dni: document.getElementById('dni').value,
                    deporte: document.getElementById('deporte').value,
                    hora: document.getElementById('hora').value
                };

                const codigoReserva = generarCodigoReserva();

                alert(`✅ Reserva exitosa!\nCódigo de tu reserva: ${codigoReserva}`);
                console.log("Reserva realizada:", dataForm, "Código:", codigoReserva);
                infoIndividual.classList.add('hidden');
            });
        })
        .catch(err => console.error('Error al cargar JSON', err));
}

canchaItems.forEach(item => {
    item.addEventListener('click', () => {
        const deporte = item.querySelector('.canchas__name').textContent.trim();
        renderFormulario(deporte);
    });
});
