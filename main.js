class Pessoa {

    constructor(nome, area) {
        this.nome = nome;
        this.area = area;
    }

    apresentar() {
        return `${this.nome} atua na área de ${this.area}`;
    }

}

class Candidato extends Pessoa {

    constructor(nome, area, habilidades, experienciaMeses) {
        super(nome, area);

        this.habilidades = habilidades;
        this.experienciaMeses = experienciaMeses;
    }

    listarHabilidades() {
        return this.habilidades.join(", ");
    }

}

const candidato = new Candidato(
    "Felipe Machado",
    "Front-end",
    ["HTML", "CSS", "JavaScript", "Git"],
    8
);

const vagas = [
    {
        empresa: "Tech Solutions",
        cargo: "Front-end Júnior",
        requisitos: ["HTML", "CSS", "JavaScript"],
        salario: "R$ 3.000",
        modalidade: "Remoto"
    },

    {
        empresa: "WebHub",
        cargo: "Desenvolvedor Front-end",
        requisitos: ["HTML", "CSS", "React", "Git"],
        salario: "R$ 3.500",
        modalidade: "Híbrido"
    },

    {
        empresa: "Digital Dev",
        cargo: "Front-end Trainee",
        requisitos: ["HTML", "CSS", "JavaScript", "TypeScript"],
        salario: "R$ 2.800",
        modalidade: "Presencial"
    }
];

function analisarCompatibilidade(candidato, vaga) {

    const habilidadesEncontradas = vaga.requisitos.filter(requisito =>
        candidato.habilidades.includes(requisito)
    );

    const habilidadesFaltantes = vaga.requisitos.filter(requisito =>
        !candidato.habilidades.includes(requisito)
    );

    const percentual = Math.round(
        (habilidadesEncontradas.length / vaga.requisitos.length) * 100
    );

    let classificacao = "";

    if (percentual >= 80) {
        classificacao = "Alta compatibilidade";
    } else if (percentual >= 50) {
        classificacao = "Média compatibilidade";
    } else {
        classificacao = "Baixa compatibilidade";
    }

    return {
        empresa: vaga.empresa,
        cargo: vaga.cargo,
        salario: vaga.salario,
        modalidade: vaga.modalidade,
        percentual,
        habilidadesEncontradas,
        habilidadesFaltantes,
        classificacao
    };
}

function recomendarEstudos(faltantes) {

    if (faltantes.length === 0) {
        return "Você já possui todas as habilidades necessárias.";
    }

    return `Estude: ${faltantes.join(", ")}`;
}

function executarAnalise(callback) {
    callback();
}

function criarContadorAnalises() {

    let total = 0;

    return function () {
        total++;
        return total;
    };

}

const contadorAnalises = criarContadorAnalises();

function carregarVagas() {

    return new Promise((resolve) => {

        setTimeout(() => {
            resolve(vagas);
        }, 2000);

    });

}

function mostrarCandidato() {

    const container = document.getElementById("dados-candidato");

    container.innerHTML = `
        <p><strong>Nome:</strong> ${candidato.nome}</p>
        <p><strong>Área:</strong> ${candidato.area}</p>
        <p><strong>Experiência:</strong> ${candidato.experienciaMeses} meses</p>
        <p><strong>Habilidades:</strong> ${candidato.listarHabilidades()}</p>
    `;
}

function criarClasseCompatibilidade(classificacao) {

    switch (classificacao) {

        case "Alta compatibilidade":
            return "alta";

        case "Média compatibilidade":
            return "media";

        default:
            return "baixa";
    }

}

function mostrarResultados(resultados) {

    const container = document.getElementById("vagas-container");

    container.innerHTML = "";

    resultados.forEach(resultado => {

        const classe = criarClasseCompatibilidade(resultado.classificacao);

        const card = document.createElement("div");

        card.classList.add("vaga-card");

        card.innerHTML = `
            <h3>${resultado.empresa}</h3>

            <p><strong>Cargo:</strong> ${resultado.cargo}</p>

            <p><strong>Salário:</strong> ${resultado.salario}</p>

            <p><strong>Modalidade:</strong> ${resultado.modalidade}</p>

            <p>
                <strong>Compatibilidade:</strong>
                ${resultado.percentual}%
            </p>

            <p class="${classe}">
                ${resultado.classificacao}
            </p>

            <p>
                <strong>Habilidades encontradas:</strong>
                ${resultado.habilidadesEncontradas.join(", ")}
            </p>

            <p>
                <strong>Habilidades faltantes:</strong>
                ${resultado.habilidadesFaltantes.length > 0
                ? resultado.habilidadesFaltantes.join(", ")
                : "Nenhuma"
            }
            </p>

            <p>
                <strong>Recomendação:</strong>
                ${recomendarEstudos(resultado.habilidadesFaltantes)}
            </p>

            <button class="btn-candidatura">
                Candidatar-se
            </button>

            <p class="mensagem"></p>
        `;

        const botao = card.querySelector(".btn-candidatura");

        const mensagem = card.querySelector(".mensagem");

        botao.addEventListener("click", () => {

            mensagem.textContent = "Candidatura enviada com sucesso!";
            mensagem.style.color = "green";
            mensagem.style.fontWeight = "bold";

            botao.disabled = true;
            botao.textContent = "Enviado";

        });

        container.appendChild(card);

    });

}

function mostrarMelhorVaga(resultados) {

    const melhor = resultados.reduce((anterior, atual) => {

        return atual.percentual > anterior.percentual
            ? atual
            : anterior;

    });

    const container = document.getElementById("melhor-vaga");

    container.innerHTML = `
        <div class="card">

            <h3>${melhor.empresa}</h3>

            <p><strong>Cargo:</strong> ${melhor.cargo}</p>

            <p>
                <strong>Compatibilidade:</strong>
                ${melhor.percentual}%
            </p>

        </div>
    `;
}

async function iniciarSistema() {

    const container = document.getElementById("vagas-container");

    container.innerHTML = `
        <p class="loading">
            Carregando vagas...
        </p>
    `;

    const vagasCarregadas = await carregarVagas();

    const resultados = vagasCarregadas.map(vaga =>
        analisarCompatibilidade(candidato, vaga)
    );

    mostrarResultados(resultados);

    mostrarMelhorVaga(resultados);

    const total = contadorAnalises();

    console.log(`Total de análises realizadas: ${total}`);
}

document
    .getElementById("btnCarregar")
    .addEventListener("click", () => {

        executarAnalise(() => {
            iniciarSistema();
        });

    });

mostrarCandidato();