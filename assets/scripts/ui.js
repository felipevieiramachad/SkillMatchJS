import {
    Candidato,
    executarAnalise,
    melhorVaga,
    recomendarEstudo,
    contadorAnalises
} from "./motor.js";

import {
    salvarPerfil
} from "./dados.js";

const contador = contadorAnalises();

export function iniciarFormulario(vagas) {

    const form = document.getElementById("formPerfil");

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();

        const area = document.getElementById("area").value;

        const habilidades = document
            .getElementById("habilidades")
            .value
            .split(",")
            .map(item => item.trim())
            .filter(item => item.length > 0);

        const experiencia =
            Number(document.getElementById("experiencia").value);

        if (
            !nome ||
            !area ||
            habilidades.length === 0
        ) {

            alert("Preencha todos os campos.");

            return;

        }

        const candidato = new Candidato(
            nome,
            area,
            habilidades,
            experiencia
        );

        salvarPerfil(candidato);

        executarAnalise(
            candidato,
            vagas,
            mostrarResultados
        );

    });

}

function mostrarResultados(resultados) {

    const container =
        document.getElementById("resultado");

    container.innerHTML = "";

    if (resultados.length === 0) {

        container.innerHTML =
            "<p>Nenhuma vaga encontrada.</p>";

        return;

    }

    resultados.forEach(resultado => {

        const card = criarCard(resultado);

        container.appendChild(card);

    });

    const melhor = melhorVaga(resultados);

    const destaque = document.createElement("section");

    destaque.classList.add("melhor-vaga");

    destaque.innerHTML = `
        <h2>Melhor oportunidade</h2>

        <p><strong>${melhor.vaga.cargo}</strong></p>

        <p>${melhor.percentual}% de compatibilidade</p>

        <p>${recomendarEstudo(melhor)}</p>

        <p>Análises realizadas nesta sessão:
        ${contador()}</p>
    `;

    container.prepend(destaque);

}

function criarCard(resultado) {

    const card = document.createElement("article");

    card.classList.add("card");

    card.innerHTML = `

        <h3>${resultado.vaga.cargo}</h3>

        <p><strong>Empresa:</strong>
        ${resultado.vaga.empresa}</p>

        <p><strong>Modalidade:</strong>
        ${resultado.vaga.modalidade}</p>

        <p><strong>Salário:</strong>
        ${resultado.vaga.salario}</p>

        <p><strong>Compatibilidade:</strong>
        ${resultado.percentual}%</p>

        <p><strong>Classificação:</strong>
        ${resultado.classificacao}</p>

        <p>

            <strong>Habilidades encontradas</strong>

            <br>

            ${resultado.encontradas.join(", ") || "Nenhuma"}

        </p>

        <p>

            <strong>Habilidades faltantes</strong>

            <br>

            ${resultado.faltantes.join(", ") || "Nenhuma"}

        </p>

    `;

    return card;

}