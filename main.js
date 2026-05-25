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

    resultados.map(resultado => {

        const botoes = document.querySelectorAll(".btn-candidatura");

        botoes.forEach(botao => {

            botao.addEventListener("click", () => {

                const mensagem = botao.nextElementSibling;

                mensagem.textContent = "Candidatura enviada com sucesso!";
                mensagem.style.color = "green";
                mensagem.style.fontWeight = "bold";

                botao.disabled = true;
                botao.textContent = "Enviado";

            });

        });

        const classe = criarClasseCompatibilidade(resultado.classificacao);

        container.innerHTML += `
    <div class="vaga-card">

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

    </div>`;
    });

}

