import appStateManager from "../lib/appManagers/appStateManager";
import { getDeepProperty } from "../helpers/object";

export default class RadioField {
  public input: HTMLInputElement;
  public label: HTMLLabelElement;
  public main: HTMLElement;

  constructor(text: string, name: string, value?: string, stateKey?: string) {
    const label = this.label = document.createElement('label');
    label.classList.add('radio-field');
  
    const input = this.input = document.createElement('input');
    input.type = 'radio';
    /* input.id =  */input.name = 'input-radio-' + name;
  
    if(value) {
      input.value = value;
  
      if(stateKey) {
        appStateManager.getState().then(state => {
          input.checked = getDeepProperty(state, stateKey) === value;
        });
    
        input.addEventListener('change', () => {
          appStateManager.setByKey(stateKey, value);
        });
      }
    }
  
    const main = this.main = document.createElement('div');
    main.classList.add('radio-field-main');
  
    if(text) {
      main.innerHTML = text;
      /* const caption = document.createElement('div');
      caption.classList.add('radio-field-main-caption');
      caption.innerHTML = text;
  
      if(subtitle) {
        label.classList.add('radio-field-with-subtitle');
        caption.insertAdjacentHTML('beforeend', `<div class="radio-field-main-subtitle">${subtitle}</div>`);
      }
  
      main.append(caption); */
    }
  
    label.append(input, main);
  }
};