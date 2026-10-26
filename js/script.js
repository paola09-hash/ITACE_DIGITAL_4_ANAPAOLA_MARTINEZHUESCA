/* =====================================
   JAVASCRIPT - PÁGINA ITACE
===================================== */
/* MENÚ RESPONSIVO */
document.addEventListener("DOMContentLoaded", function () {
    const botonMenu = document.getElementById("menuHamburguesa");
    const enlacesMenu = document.getElementById("enlacesMenu");
    if (!botonMenu || !enlacesMenu) return;
    /* ABRIR Y CERRAR MENÚ */
    botonMenu.addEventListener("click", function () {
        const abierto = enlacesMenu.classList.toggle("activo");
        botonMenu.textContent = abierto ? "✕" : "☰";
        botonMenu.setAttribute("aria-expanded", String(abierto));
        botonMenu.setAttribute(
            "aria-label",
            abierto ? "Cerrar menú" : "Abrir menú"
        );
    });
    /* CERRAR MENÚ AL ELEGIR UNA SECCIÓN */
    enlacesMenu.querySelectorAll("a").forEach(function (enlace) {
        enlace.addEventListener("click", function () {
            enlacesMenu.classList.remove("activo");
            botonMenu.textContent = "☰";
            botonMenu.setAttribute("aria-expanded", "false");
            botonMenu.setAttribute("aria-label", "Abrir menú");
        });
    });
});

/* =====================================
   MOSTRAR MÁS HISTORIA DEL ITACE
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const botonHistoria = document.getElementById("botonHistoria");
    const lineaTiempo = document.getElementById("lineaTiempo");

    if (!botonHistoria || !lineaTiempo) return;

    botonHistoria.addEventListener("click", function () {

        const expandida = lineaTiempo.classList.toggle("expandida");

        if (expandida) {
            botonHistoria.textContent = "📜 Mostrar menos historia ↑";
        } else {
            botonHistoria.textContent = "📜 Ver más historia ↓";
        }

        botonHistoria.setAttribute(
            "aria-expanded",
            String(expandida)
        );

    });

});

/* =====================================
   CARRUSEL DE CARRERAS DEL ITACE
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const pista = document.getElementById("pistaCarreras");
    const anterior = document.getElementById("carreraAnterior");
    const siguiente = document.getElementById("carreraSiguiente");

    if (!pista || !anterior || !siguiente) return;

    function moverCarrusel(direccion) {
        const tarjeta = pista.querySelector(".tarjeta-carrera");

        if (!tarjeta) return;

        const estilos = getComputedStyle(pista);
        const espacio = parseFloat(estilos.gap) || 0;
        const distancia = tarjeta.getBoundingClientRect().width + espacio;

        pista.scrollBy({
            left: direccion * distancia,
            behavior: "smooth"
        });
    }

    function actualizarFlechas() {
        const maximo = pista.scrollWidth - pista.clientWidth;

        anterior.disabled = pista.scrollLeft <= 2;
        siguiente.disabled = pista.scrollLeft >= maximo - 2;
    }

    anterior.addEventListener("click", function () {
        moverCarrusel(-1);
    });

    siguiente.addEventListener("click", function () {
        moverCarrusel(1);
    });

    pista.addEventListener("scroll", actualizarFlechas);
    window.addEventListener("resize", actualizarFlechas);

    actualizarFlechas();

});

/* =====================================
   VENTANAS DE INFORMACIÓN DE CARRERAS
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("modalCarrera");
    const cerrar = document.getElementById("cerrarModalCarrera");
    const volver = document.getElementById("volverCarreras");
    const tarjetas = document.querySelectorAll(
        "#carreras .tarjeta-carrera"
    );

    if (!modal || !cerrar || !volver || !tarjetas.length) return;

    /* INFORMACIÓN DE LAS 7 CARRERAS */

    const informacionCarreras = [
        {
            aprendizaje:
                "Fundamentos de programación, análisis de datos, " +
                "automatización, algoritmos y aplicaciones de inteligencia artificial.",

            trabajo:
                "Apoyo en proyectos tecnológicos, desarrollo de software, " +
                "automatización y análisis básico de información."
        },
        {
            aprendizaje:
                "Seguridad de redes, protección de datos, " +
                "identificación de riesgos informáticos y buenas prácticas digitales.",

            trabajo:
                "Soporte informático, monitoreo de sistemas, " +
                "protección de información y asistencia en seguridad digital."
        },
        {
            aprendizaje:
                "Circuitos electrónicos, componentes semiconductores, " +
                "mediciones eléctricas y fundamentos de microelectrónica.",

            trabajo:
                "Apoyo técnico en electrónica, pruebas de componentes, " +
                "manufactura tecnológica y mantenimiento de equipos."
        },
        {
            aprendizaje:
                "Diseño visual, edición de imágenes, composición gráfica, " +
                "herramientas digitales y producción multimedia.",

            trabajo:
                "Diseño publicitario, creación de contenido digital, " +
                "material gráfico y apoyo en proyectos creativos."
        },
        {
            aprendizaje:
                "Control de inventarios, almacenamiento, distribución, " +
                "organización de mercancías y procesos logísticos.",

            trabajo:
                "Auxiliar de almacén, control de inventarios, " +
                "distribución y apoyo en operaciones logísticas."
        },
        {
            aprendizaje:
                "Mecánica industrial, electricidad, diagnóstico de fallas, " +
                "mantenimiento preventivo y seguridad en equipos.",

            trabajo:
                "Apoyo en mantenimiento de maquinaria, " +
                "operaciones industriales y revisión de equipos."
        },
        {
            aprendizaje:
                "Funcionamiento de motores, sistemas automotrices, " +
                "diagnóstico de fallas y mantenimiento de vehículos.",

            trabajo:
                "Apoyo en talleres automotrices, mantenimiento preventivo, " +
                "servicio técnico y revisión de vehículos."
        }
    ];

    const titulo = document.getElementById("modalCarreraTitulo");
    const imagen = document.getElementById("modalCarreraImagen");
    const descripcion = document.getElementById("modalCarreraDescripcion");
    const aprendizaje = document.getElementById("modalCarreraAprendizaje");
    const trabajo = document.getElementById("modalCarreraTrabajo");

    let botonAnterior = null;

    /* ABRIR VENTANA */

    tarjetas.forEach(function (tarjeta, indice) {

        const boton = tarjeta.querySelector(".boton-conocer");

        if (!boton) return;

        boton.addEventListener("click", function () {

            const nombre = tarjeta.querySelector("h3");
            const foto = tarjeta.querySelector("img");
            const texto = tarjeta.querySelector("p");
            const detalles = informacionCarreras[indice];

            if (!nombre || !foto || !texto || !detalles) return;

            titulo.textContent = nombre.textContent;
            imagen.src = foto.src;
            imagen.alt = foto.alt;
            descripcion.textContent = texto.textContent.trim();

            aprendizaje.textContent = detalles.aprendizaje;
            trabajo.textContent = detalles.trabajo;

            botonAnterior = boton;

            modal.hidden = false;
            modal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";

            cerrar.focus();

        });
    });

    /* CERRAR VENTANA */

    function cerrarModal() {
        modal.hidden = true;
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

        if (botonAnterior) {
            botonAnterior.focus();
        }
    }

    cerrar.addEventListener("click", cerrarModal);
    volver.addEventListener("click", cerrarModal);

    /* CERRAR AL TOCAR EL FONDO OSCURO */

    modal.addEventListener("click", function (evento) {
        if (evento.target === modal) {
            cerrarModal();
        }
    });

    /* CERRAR CON LA TECLA ESCAPE */

    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape" && !modal.hidden) {
            cerrarModal();
        }
    });

    /* MANTENER EL TECLADO DENTRO DE LA VENTANA */

    modal.addEventListener("keydown", function (evento) {

        if (evento.key !== "Tab") return;

        const controles = [cerrar, volver];
        const primero = controles[0];
        const ultimo = controles[controles.length - 1];

        if (evento.shiftKey && document.activeElement === primero) {
            evento.preventDefault();
            ultimo.focus();
        } else if (!evento.shiftKey && document.activeElement === ultimo) {
            evento.preventDefault();
            primero.focus();
        }
    });

});

/* =====================================
   📸 ÁLBUM DIGITAL - VIDA ESTUDIANTIL
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const galeria = document.getElementById("albumGaleria");
    const modal = document.getElementById("albumModal");

    if (!galeria || !modal) return;

    const fotos = Array.from(
        galeria.querySelectorAll(".album-foto")
    );

    const filtros = document.querySelectorAll(".filtro-album");
    const mensajeVacio = document.getElementById("albumVacio");

    const imagenGrande = document.getElementById("albumImagenGrande");
    const titulo = document.getElementById("albumTitulo");
    const descripcion = document.getElementById("albumDescripcion");
    const contador = document.getElementById("albumContador");

    const cerrar = document.getElementById("albumCerrar");
    const anterior = document.getElementById("albumAnterior");
    const siguiente = document.getElementById("albumSiguiente");

    let fotosVisibles = [...fotos];
    let indiceActual = 0;
    let botonOrigen = null;

    // FILTRAR FOTOGRAFÍAS
    filtros.forEach(boton => {
        boton.addEventListener("click", function () {

            const categoria = this.dataset.filtro;

            filtros.forEach(filtro => {
                const activo = filtro === this;
                filtro.classList.toggle("activo", activo);
                filtro.setAttribute("aria-pressed", String(activo));
            });

            fotosVisibles = fotos.filter(foto => {
                const mostrar =
                    categoria === "todos" ||
                    foto.dataset.categoria === categoria;

                foto.hidden = !mostrar;
                return mostrar;
            });

            mensajeVacio.hidden = fotosVisibles.length > 0;
        });
    });

    // MOSTRAR FOTO AMPLIADA
    function mostrarFoto() {
        const foto = fotosVisibles[indiceActual];
        if (!foto) return;

        const imagen = foto.querySelector("img");

        imagenGrande.src = imagen.src;
        imagenGrande.alt = imagen.alt;

        titulo.textContent =
            foto.querySelector("h3").textContent;

        descripcion.textContent =
            foto.querySelector("figcaption p").textContent;

        contador.textContent =
            `${indiceActual + 1} de ${fotosVisibles.length} recuerdos`;
    }

    // ABRIR ÁLBUM
    fotos.forEach(foto => {
        const boton = foto.querySelector(".album-abrir");

        boton.addEventListener("click", function () {
            fotosVisibles = fotos.filter(item => !item.hidden);
            indiceActual = fotosVisibles.indexOf(foto);

            if (indiceActual === -1) return;

            botonOrigen = boton;
            mostrarFoto();

            modal.hidden = false;
            modal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
            cerrar.focus();
        });
    });

    // FOTO ANTERIOR
    anterior.addEventListener("click", function () {
        indiceActual =
            (indiceActual - 1 + fotosVisibles.length) %
            fotosVisibles.length;

        mostrarFoto();
    });

    // FOTO SIGUIENTE
    siguiente.addEventListener("click", function () {
        indiceActual =
            (indiceActual + 1) % fotosVisibles.length;

        mostrarFoto();
    });

    // CERRAR VISOR
    function cerrarAlbum() {
        modal.hidden = true;
        modal.setAttribute("aria-hidden", "true");
        imagenGrande.removeAttribute("src");
        document.body.style.overflow = "";

        if (botonOrigen) botonOrigen.focus();
    }

    cerrar.addEventListener("click", cerrarAlbum);

    // CERRAR AL PULSAR EL FONDO
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            cerrarAlbum();
        }
    });

    // CONTROLES DEL TECLADO
    document.addEventListener("keydown", function (e) {
        if (modal.hidden) return;

        if (e.key === "Escape") {
            cerrarAlbum();
        }

        if (e.key === "ArrowRight") {
            siguiente.click();
        }

        if (e.key === "ArrowLeft") {
            anterior.click();
        }

        if (e.key === "Tab") {
            const controles = [cerrar, anterior, siguiente];
            const indice = controles.indexOf(document.activeElement);

            if (e.shiftKey && indice === 0) {
                e.preventDefault();
                siguiente.focus();
            } else if (!e.shiftKey && indice === 2) {
                e.preventDefault();
                cerrar.focus();
            }
        }
    });

});

/* =====================================
   VENTANAS DE LOS CLUBES
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const clubes = {
        rondalla: {
            nombre: "🎶 Rondalla",
            descripcion: "La rondalla es una agrupación musical que permite a los estudiantes desarrollar sus habilidades artísticas y disfrutar de la música.",
            habilidades: "Interpretación musical, coordinación, expresión artística y trabajo en equipo."
        },

        banda: {
            nombre: "🥁 Banda de guerra",
            descripcion: "La banda de guerra es una actividad cívica que fomenta la disciplina, el respeto y la coordinación.",
            habilidades: "Disciplina, coordinación, trabajo en equipo y participación cívica."
        },

        oratoria: {
            nombre: "🎤 Oratoria",
            descripcion: "La oratoria es el arte de hablar en público de manera clara, segura y expresiva.",
            habilidades: "Comunicación, expresión oral, argumentación y confianza."
        },

        robotica: {
            nombre: "🤖 Robótica",
            descripcion: "La robótica combina tecnología, creatividad y conocimientos para comprender y desarrollar sistemas automatizados.",
            habilidades: "Pensamiento lógico, programación, creatividad y resolución de problemas."
        },

        danza: {
            nombre: "💃 Danza",
            descripcion: "La danza es una forma de expresión artística que utiliza el movimiento corporal y la música.",
            habilidades: "Ritmo, coordinación, creatividad y expresión corporal."
        },

        ajedrez: {
            nombre: "♟️ Ajedrez",
            descripcion: "El ajedrez es un juego de estrategia que estimula el pensamiento lógico y la concentración.",
            habilidades: "Estrategia, paciencia, análisis y toma de decisiones."
        },

        dibujo: {
            nombre: "🎨 Dibujo",
            descripcion: "El dibujo es una actividad artística que permite representar ideas, emociones y objetos mediante técnicas visuales.",
            habilidades: "Creatividad, observación, imaginación y expresión artística."
        },

        premilitar: {
            nombre: "🎖️ Premilitar",
            descripcion: "La formación premilitar se enfoca en actividades relacionadas con la disciplina, la organización y el trabajo colectivo.",
            habilidades: "Responsabilidad, respeto, disciplina y compañerismo."
        }
    };

    const modal = document.getElementById("modalClub");
    const titulo = document.getElementById("tituloClub");
    const descripcion = document.getElementById("descripcionClub");
    const habilidades = document.getElementById("habilidadesClub");
    const cerrar = document.getElementById("cerrarClub");
    const volver = document.getElementById("volverClub");

    if (!modal || !titulo || !descripcion ||
        !habilidades || !cerrar || !volver) return;

    let botonAnterior = null;

    function cerrarVentana() {
        modal.hidden = true;
        document.body.style.overflow = "";
        if (botonAnterior) botonAnterior.focus();
    }

    document.querySelectorAll("#clubes [data-club]").forEach(boton => {
        boton.addEventListener("click", function () {
            const club = clubes[boton.dataset.club];

            if (!club) return;

            botonAnterior = boton;
            titulo.textContent = club.nombre;
            descripcion.textContent = club.descripcion;
            habilidades.textContent = club.habilidades;

            modal.hidden = false;
            document.body.style.overflow = "hidden";
            cerrar.focus();
        });
    });

    cerrar.addEventListener("click", cerrarVentana);
    volver.addEventListener("click", cerrarVentana);

    modal.addEventListener("click", function (evento) {
        if (evento.target === modal) cerrarVentana();
    });

    document.addEventListener("keydown", function (evento) {
        if (modal.hidden) return;

        if (evento.key === "Escape") {
            cerrarVentana();
        }

        if (evento.key === "Tab") {
            const controles = [cerrar, volver];
            const primero = controles[0];
            const ultimo = controles[1];

            if (evento.shiftKey &&
                document.activeElement === primero) {
                evento.preventDefault();
                ultimo.focus();
            } else if (!evento.shiftKey &&
                       document.activeElement === ultimo) {
                evento.preventDefault();
                primero.focus();
            }
        }
    });
});

/* =====================================
   🎠 CARRUSEL DE CLUBES
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const carrusel = document.querySelector(
        "#clubes .clubes-grid"
    );

    const anterior = document.querySelector(
        "#clubes .club-anterior"
    );

    const siguiente = document.querySelector(
        "#clubes .club-siguiente"
    );

    if (!carrusel || !anterior || !siguiente) return;

    function distanciaTarjeta() {
        const tarjeta = carrusel.querySelector(".club-card");

        if (!tarjeta) return 0;

        const estilos = getComputedStyle(carrusel);
        const separacion = parseFloat(estilos.columnGap) || 0;

        return tarjeta.getBoundingClientRect().width + separacion;
    }

    function actualizarFlechas() {
        const maximo = carrusel.scrollWidth - carrusel.clientWidth;

        anterior.disabled = carrusel.scrollLeft <= 2;
        siguiente.disabled = carrusel.scrollLeft >= maximo - 2;
    }

    anterior.addEventListener("click", function () {
        carrusel.scrollBy({
            left: -distanciaTarjeta(),
            behavior: "smooth"
        });
    });

    siguiente.addEventListener("click", function () {
        carrusel.scrollBy({
            left: distanciaTarjeta(),
            behavior: "smooth"
        });
    });

    carrusel.addEventListener("scroll", actualizarFlechas);
    window.addEventListener("resize", actualizarFlechas);

    actualizarFlechas();

});

/* =====================================
   1. BOTÓN PARA VOLVER ARRIBA
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const botonSubir = document.querySelector(
        "#volverArriba, #btnVolverArriba, .volver-arriba, .boton-subir"
    );

    // Si la página no tiene el botón, no hacemos nada.
    if (!botonSubir) return;

    // Mostrar el botón al bajar por la página.
    function actualizarBoton() {

        const mostrar = window.scrollY > 350;

        botonSubir.classList.toggle("oculto", !mostrar);

    }

    // Regresar al inicio al hacer clic.
    botonSubir.addEventListener("click", function () {

        const reducirMovimiento = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        window.scrollTo({
            top: 0,
            behavior: reducirMovimiento ? "instant" : "smooth"
        });

    });

    // Revisar cuando el usuario se desplaza.
    window.addEventListener("scroll", actualizarBoton, {
        passive: true
    });

    // Revisar el estado inicial.
    actualizarBoton();

});

/* =====================================
   2. FILTROS DE NOTICIAS Y PROYECTOS
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       FUNCIÓN GENERAL PARA FILTRAR
    ===================================== */

    function configurarFiltros(
        selectorBotones,
        selectorTarjetas
    ) {

        const botones = document.querySelectorAll(
            selectorBotones
        );

        const tarjetas = document.querySelectorAll(
            selectorTarjetas
        );

        // Si no existen los elementos,
        // no ejecutamos esta función.

        if (!botones.length || !tarjetas.length) {
            return;
        }

        /* =====================================
           RECORRER BOTONES
        ===================================== */

        botones.forEach(function (boton) {

            boton.addEventListener("click", function () {

                const categoria = (
                    boton.dataset.filtro || "todos"
                ).toLowerCase();

                /* =====================================
                   CAMBIAR BOTÓN ACTIVO
                ===================================== */

                botones.forEach(function (otroBoton) {

                    const activo = otroBoton === boton;

                    otroBoton.classList.toggle(
                        "activo",
                        activo
                    );

                    otroBoton.setAttribute(
                        "aria-pressed",
                        String(activo)
                    );

                });

                /* =====================================
                   MOSTRAR U OCULTAR TARJETAS
                ===================================== */

                tarjetas.forEach(function (tarjeta) {

                    const categoriaTarjeta = (
                        tarjeta.dataset.categoria || ""
                    ).toLowerCase();

                    const categorias = categoriaTarjeta
                        .split(/\s+/)
                        .filter(Boolean);

                    const mostrar =
                        categoria === "todos" ||
                        categorias.includes(categoria);

                    tarjeta.classList.toggle(
                        "oculto",
                        !mostrar
                    );

                    tarjeta.hidden = !mostrar;
                });
            });
        });
    }
    /* =====================================
       FILTROS DE NOTICIAS
    ===================================== */
  configurarFiltros(
    ".noticias-publicaciones .filtro-noticia",
    ".noticias-publicaciones .tarjeta-noticia"
);
    /* =====================================
       FILTROS DE PROYECTOS
    ===================================== */
    configurarFiltros(
        ".filtro-proyecto",
        ".proyecto-card, .tarjeta-proyecto"
    );
});
