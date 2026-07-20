// Classe base
export class Pessoa {
    constructor(nome) {
        this.nome = nome;
    }
}

// Classe do candidato
export class Candidato extends Pessoa {
    constructor(nome, area, habilidades, experienciaMeses) {
        super(nome);

        this.area = area;
        this.habilidades = habilidades;
        this.experienciaMeses = experienciaMeses;
    }
}

// Classe principal da vaga
export class Vaga {

    constructor(id, empresa, cargo, requisitos, salario, modalidade) {

        this.id = id;
        this.empresa = empresa;
        this.cargo = cargo;
        this.requisitos = requisitos;
        this.salario = salario;
        this.modalidade = modalidade;

    }

    calcularCompatibilidade(candidato) {

        const encontradas = this.requisitos.filter(req =>
            candidato.habilidades.some(h =>
                h.toLowerCase().trim() === req.toLowerCase().trim()
            )
        );

        const faltantes = this.requisitos.filter(req =>
            !candidato.habilidades.some(h =>
                h.toLowerCase().trim() === req.toLowerCase().trim()
            )
        );

        const percentual =
            Math.round((encontradas.length / this.requisitos.length) * 100);

        return {
            vaga: this,
            percentual,
            encontradas,
            faltantes,
            classificacao: this.classificar(percentual)
        };

    }

    classificar(percentual) {

        if (percentual >= 80)
            return "Alta";

        if (percentual >= 50)
            return "Média";

        return "Baixa";

    }

}

// Herança
export class VagaFrontEnd extends Vaga {

    constructor(
        id,
        empresa,
        cargo,
        requisitos,
        salario,
        modalidade,
        stack
    ) {

        super(
            id,
            empresa,
            cargo,
            requisitos,
            salario,
            modalidade
        );

        this.stack = stack;

    }

    getDescricao() {

        return `${this.cargo} (${this.stack})`;

    }

}

// Analisa todas as vagas
export function analisarVagas(candidato, vagas) {

    return vagas.map(vaga =>
        vaga.calcularCompatibilidade(candidato)
    );

}

// Melhor vaga usando reduce
export function melhorVaga(resultados) {

    return resultados.reduce((melhor, atual) => {

        if (!melhor)
            return atual;

        if (atual.percentual > melhor.percentual)
            return atual;

        if (
            atual.percentual === melhor.percentual &&
            atual.vaga.requisitos.length > melhor.vaga.requisitos.length
        ) {
            return atual;
        }

        return melhor;

    }, null);

}

// Recomendação
export function recomendarEstudo(resultado) {

    if (resultado.faltantes.length === 0)
        return "Você já atende todos os requisitos desta vaga.";

    return "Recomendamos estudar: " +
        resultado.faltantes.join(", ");

}

// Callback
export function executarAnalise(candidato, vagas, callback) {

    const resultados = analisarVagas(candidato, vagas);

    callback(resultados);

}

// Closure
export function contadorAnalises() {

    let contador = 0;

    return function () {

        contador++;

        return contador;

    };

}