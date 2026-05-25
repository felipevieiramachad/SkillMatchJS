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

