let tarifa = 10.00;
const senhaCorreta = "admin123";
let novaTarifa = 0.0;
function solicitarSenhaAdmin(callback) {
    const senha = prompt("Digite a senha do ADMIN");
    if (senha === senhaCorreta) {
        callback();
    } else {
        alert("Senha incorreta!");
    }
}
function alterarTarifa() {
    solicitarSenhaAdmin(() => {
        novaTarifa = parseFloat(prompt("Digite a nova Tarifa"));
        if (novaTarifa >= 0 && novaTarifa !== tarifa) {
            tarifa = novaTarifa;
            document.getElementById("tarifaAtual").innerText = `Tarifa: ${tarifa}`;
            alert("Tarifa alterada com sucesso!");
        } else {
            alert("Por favor, insira um valor válido para a tarifa.");
        }
    });
}
function registrarEntrada() {
    const placa = document.getElementById("placa").value;
    const modelo = document.getElementById("modelo").value;
    const cor = document.getElementById("cor").value;
    const horaEntrada = document.getElementById("horaEntrada").value;
    const minutoEntrada = document.getElementById("minE").value;
    const horaSaida = document.getElementById("horaSaida").value;
    const minutoSaida = document.getElementById("minS").value;
    if (placa && modelo && cor && horaEntrada && horaSaida && minutoEntrada && minutoSaida) {
        const tabela = document.getElementById("tabela-registros");
        const novaLinha = tabela.insertRow();
        novaLinha.insertCell(0).innerText = placa;
        novaLinha.insertCell(1).innerText = modelo;
        novaLinha.insertCell(2).innerText = cor;
        novaLinha.insertCell(3).innerText = `${horaEntrada}:${minutoEntrada}`;
        novaLinha.insertCell(4).innerText = `${horaSaida}:${minutoSaida}`;
        novaLinha.insertCell(5).innerText = "-";
        novaLinha.insertCell(6).innerText = "-";

        const btnSaida = document.createElement("button");
        btnSaida.innerText = "Registrar Saída";
        btnSaida.onclick = () => registrarSaida(novaLinha, horaEntrada, minutoEntrada, horaSaida, minutoSaida);
        novaLinha.insertCell(7).appendChild(btnSaida);

        alert("Entrada registrada!");

        document.getElementById("placa").value = "";
        document.getElementById("modelo").value = "";
        document.getElementById("cor").value = "";
        document.getElementById("horaEntrada").value = "";
        document.getElementById("horaSaida").value = "";
        document.getElementById("minE").value = "";
        document.getElementById("minS").value = "";
    }
    else {
        alert("Por favor, preencha todos os campos.");
    }
}
function registrarSaida(linha, horaEntrada, minutoEntrada, horaSaida, minutoSaida) {
    const tempoHoras = horaSaida - horaEntrada;
    const tempoMinutos = minutoSaida - minutoEntrada;
    const tempoTotal = tempoHoras + (tempoMinutos / 60);
    const tempoTotalArredondado =  Math.round(tempoTotal); 
    linha.cells[5].innerText = tempoTotalArredondado; 
    const valor = tempoTotalArredondado * tarifa;
    linha.cells[6].innerText = valor.toFixed(2);
    linha.cells[7].innerText = "Saída Registrada";
}