function mostrarResultados() {
    document.getElementById("formulario").style.display = "none";
    document.getElementById("resultados").style.display = "block";
}

function mostrarAnalisis() {
    let analisisHTML = `
        <h1>Análisis de Resultados</h1>
        <table border="1">
            <tr>
                <th>Parámetro</th>
                <th>Valor</th>
                <th>Estado</th>
                <th>Recomendación</th>
            </tr>
    `;

    const referencias = {
        insulina: { normal: [2, 25], recomendacion: "Evite el exceso de carbohidratos y azúcares refinados." },
        cortisol: { normal: [5, 25], recomendacion: "Reduzca el estrés y practique técnicas de relajación." },
        glucemia_basal: { 
            normal: [70, 99], prediabetes: [100, 125], diabetes: [126, Infinity],
            recomendacion: "Reduzca el consumo de azúcar y carbohidratos, haga ejercicio regularmente."
        },
        hb1ac: { 
            normal: [4, 5.6], prediabetes: [5.7, 6.4], diabetes: [6.5, Infinity],
            recomendacion: "Modere su ingesta de azúcares y aumente la actividad física."
        },
        tsh: { normal: [0.4, 4], recomendacion: "Consulte a un endocrinólogo si el valor es anormal." },
        t4l: { normal: [0.8, 2.0], recomendacion: "Verifique su función tiroidea con su médico." },
        perfil_lipidico: { 
            normal: [0, 200], limite_alto: [200, 239], alto: [240, Infinity],
            recomendacion: "Reduzca el consumo de grasas saturadas y haga ejercicio regularmente."
        },
        acido_urico: { normal: [2.4, 7.0], recomendacion: "Evite el consumo excesivo de carnes rojas y mariscos." },
        creatinina: { normal: [0.6, 1.3], recomendacion: "Mantenga una hidratación adecuada." },
        tgo: { normal: [0, 40], recomendacion: "Evite el consumo de alcohol y alimentos procesados." },
        tgp: { normal: [0, 41], recomendacion: "Consuma más frutas y verduras para mejorar la función hepática." }
    };

    for (let examen in referencias) {
        let valor = parseFloat(document.getElementById(examen).value);
        if (!isNaN(valor)) {
            let estado = "Muy Alto";
            let recomendacion = referencias[examen].recomendacion;

            if (referencias[examen].normal && valor >= referencias[examen].normal[0] && valor <= referencias[examen].normal[1]) {
                estado = "Normal";
                recomendacion = "✅"; // Se cambia el "-" por "✅"
            } else if (referencias[examen].prediabetes && valor >= referencias[examen].prediabetes[0] && valor <= referencias[examen].prediabetes[1]) {
                estado = "Prediabetes";
            } else if (referencias[examen].diabetes && valor >= referencias[examen].diabetes[0]) {
                estado = "Diabetes";
            } else if (referencias[examen].limite_alto && valor >= referencias[examen].limite_alto[0] && valor <= referencias[examen].limite_alto[1]) {
                estado = "Límite Alto";
            } else if (referencias[examen].alto && valor >= referencias[examen].alto[0]) {
                estado = "Alto";
            }

            analisisHTML += `
                <tr>
                    <td>${examen.replace("_", " ").toUpperCase()}</td>
                    <td>${valor}</td>
                    <td>${estado}</td>
                    <td>${recomendacion}</td>
                </tr>
            `;
        }
    }

    let antigeno = parseFloat(document.getElementById("antigeno_prostatico").value);
    let edad = parseInt(document.getElementById("edad").value);

    if (!isNaN(antigeno) && !isNaN(edad)) {
        let estadoAntigeno = "Muy Alto";
        let recomendacionAntigeno = "Consulte con su médico para una evaluación más detallada.";

        if (edad >= 40 && edad <= 49 && antigeno >= 0 && antigeno <= 2.5) {
            estadoAntigeno = "Normal";
            recomendacionAntigeno = "✅"; // Se cambia el "-" por "✅"
        } else if (edad >= 50 && edad <= 59 && antigeno >= 0 && antigeno <= 3.5) {
            estadoAntigeno = "Normal";
            recomendacionAntigeno = "✅";
        } else if (edad >= 60 && edad <= 69 && antigeno >= 0 && antigeno <= 4.5) {
            estadoAntigeno = "Normal";
            recomendacionAntigeno = "✅";
        } else if (edad >= 70 && antigeno >= 0 && antigeno <= 6.5) {
            estadoAntigeno = "Normal";
            recomendacionAntigeno = "✅";
        } else {
            estadoAntigeno = "Alto";
        }

        analisisHTML += `
            <tr>
                <td>Antígeno Prostático Total</td>
                <td>${antigeno}</td>
                <td>${estadoAntigeno}</td>
                <td>${recomendacionAntigeno}</td>
            </tr>
        `;
    }

    analisisHTML += `</table>`;
    document.getElementById("analisis").innerHTML = analisisHTML;
    document.getElementById("resultados").style.display = "none";
    document.getElementById("analisis").style.display = "block";
}
