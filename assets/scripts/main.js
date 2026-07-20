import {
    carregarVagas,
    carregarPerfil
} from "./dados.js";

import {
    iniciarFormulario
} from "./ui.js";

window.addEventListener("DOMContentLoaded", async () => {

    const vagas = await carregarVagas();

    iniciarFormulario(vagas);

    const perfil = carregarPerfil();

    if (perfil) {

        document.getElementById("nome").value =
            perfil.nome;

        document.getElementById("area").value =
            perfil.area;

        document.getElementById("habilidades").value =
            perfil.habilidades.join(", ");

        document.getElementById("experiencia").value =
            perfil.experienciaMeses;

    }

});