/**
 * @classdesc This class will be used in NLW #11 Setup and will help students
 * to create the event's project by simplifying several JS concepts.
 */
var NLWSetup = class NLWSetup {
  /**
   * @param {HTMLFormElement} form
   */
  constructor(form) {
    this.form = form;
    this.daysContainer = this.form.querySelector('.days');

    // Inicializando propriedades aqui (mais compatibilidade)
    this.data = {};
    this.habits = [];
    this.days = new Set();

    this.form.addEventListener('change', () => this.#update());
    this.createHabits();
    this.load();
  }

  load() {
    const hasData = Object.keys(this.data).length > 0;
    if (!hasData) return;

    this.#registerDays();
    this.renderLayout();
  }

  #registerDays() {
    Object.keys(this.data).forEach((key) => {
      this.data[key].forEach((date) => {
        this.days.add(date);
      });
    });
  }

  renderLayout() {
    this.daysContainer.innerHTML = '';
    for (let date of this.#getSortedDays()) {
      const [month, day] = date.split('-');
      this.#createDayElement(`${day}/${month}`);
    }
  }

  createHabits() {
    this.form
      .querySelectorAll('.habit')
      .forEach((habit) => this.#addHabit(habit.dataset.name));
  }

  #addHabit(habit) {
    this.habits = [...this.habits, habit];
    return this;
  }

  #getFormattedDate(date) {
    const [day, month] = date.split('/');
    return `${month}-${day}`;
  }

  #update() {
    const formData = new FormData(this.form);
    const prepareData = {};
    for (let habit of this.habits) {
      prepareData[habit] = formData.getAll(habit);
    }

    this.setData(prepareData);
  }

  setData(data) {
    if (!data) {
      throw 'Object data is needed { habitName: [...days: string] }';
    }
    this.data = data;
  }

  #getSortedDays() {
    return [...this.days].sort();
  }

  dayExists(date) {
    const formattedDate = this.#getFormattedDate(date);
    return this.days.has(formattedDate);
  }

  addDay(date) {
    if (!date || !date.includes('/')) return;
    if (this.dayExists(date)) return;
    this.days.add(this.#getFormattedDate(date));
    this.renderLayout();
  }

  #createDayElement(date) {
    const divDay = document.createElement('div');
    divDay.setAttribute('class', 'day');
    divDay.innerHTML = `<div>${date}</div>` + this.createCheckboxes(date);
    this.daysContainer.append(divDay);
  }

  createCheckboxes(date) {
    const formattedDate = this.#getFormattedDate(date);
    let checkboxes = '';
    for (let habit of this.habits) {
      const isChecked = this.data[habit]?.includes(formattedDate)
        ? 'checked'
        : '';
      checkboxes += `<input 
        type="checkbox" name="${habit}" value="${formattedDate}" ${isChecked}/>`;
    }

    return checkboxes;
  }
};
