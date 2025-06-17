const form = document.querySelector('#form-habits');
const nlwSetup = new NLWSetup(form);
const button = document.querySelector('header button');

button.addEventListener('click', add);

function add() {
  //adicionar um dia na agenda
  const today = new Date().toLocaleDateString('pt-br').slice(0, -5);
  const dayExists = nlwSetup.dayExists(today);

  if (dayExists) {
    alert('Dia já incluso');
    return;
  }
  alert('Adicionado com sucesso!');
  nlwSetup.addDay(today);
}
//vamos salvar no Browser os dados em localStorage
function save() {
  localStorage.setItem('NLWSetup@habits', JSON.stringify(nlwSetup.data));
}

const data = JSON.parse(localStorage.getItem('NLWSetup@habits')) || {};
nlwSetup.setData(data);
nlwSetup.load();
