import { Vaga, VagaFrontEnd } from "./motor.js";

const URL_VAGAS = "./assets/dados/vagas.json";

// =========================
// FETCH DAS VAGAS
// =========================
export async function carregarVagas() {

    const status = document.getElementById("status");

    try {

        status.textContent = "Carregando vagas...";

        const response = await fetch(URL_VAGAS);

        if (!response.ok) {
            throw new Error("Erro ao carregar as vagas.");
        }

        const dados = await response.json();

        if (!dados.length) {
            status.textContent = "Nenhuma vaga encontrada.";
            return [];
        }

        status.textContent = "";

        return dados.map(vaga => {

            if (vaga.stack) {

                return new VagaFrontEnd(
                    vaga.id,
                    vaga.empresa,
                    vaga.cargo,
                    vaga.requisitos,
                    vaga.salario,
                    vaga.modalidade,
                    vaga.stack
                );

            }

            return new Vaga(
                vaga.id,
                vaga.empresa,
                vaga.cargo,
                vaga.requisitos,
                vaga.salario,
                vaga.modalidade
            );

        });

    } catch (erro) {

        console.error(erro);

        status.textContent =
            "Não foi possível carregar as vagas.";

        return [];

    }

}

// =========================
// LOCAL STORAGE
// =========================

const CHAVE = "perfilSkillMatch";

export function salvarPerfil(candidato) {

    localStorage.setItem(
        CHAVE,
        JSON.stringify(candidato)
    );

}

export function carregarPerfil() {

    const dados = localStorage.getItem(CHAVE);

    if (!dados)
        return null;

    return JSON.parse(dados);

}

export function removerPerfil() {

    localStorage.removeItem(CHAVE);

}