import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private btnOperations: string[] = ['1', '2', '3', '+', '4', '5', '6', '*', '7', '8', '9', '-', '0', '(', ')', '/'];
  public formGroup: FormGroup = new FormGroup({
    input: new FormControl('')
  });
  public data: { text: string, total: string }[] = [];
  public tempBtnOperations: string[] = [];
  public changesPosition = {
    history: false,
    random: false,
    view: false
  };

  constructor() {
    this.tempBtnOperations = this.btnOperations;
  }

  public changes(event: any) {
    const char = String.fromCharCode(event.which);
    const pattern = new RegExp('[0-9/*+()-]');
    const text = this.formGroup.get('input')?.value;
    if (!pattern.test(char) || (text && text[text.length - 1] === char)) {
      event.preventDefault();
    }
  }
  public enter(btn: boolean, event?: any) {
    console.log(event);
    if (btn) {
      const input = this.formGroup.get('input')?.value;
      this.data.push({ text: input, total: eval(input) });
      this.formGroup.get('input')?.setValue('');
    } else {
      event.preventDefault();
    }
  }

  private random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  public dataRandom() {
    this.changesPosition.random = !this.changesPosition.random;
    if (this.changesPosition.random) {
      const temp: string[] = [];
      for (let i = 0; i < this.btnOperations.length; i++) {
        const r = this.random(0, this.btnOperations.length);
        const element = this.btnOperations[r];
        let isElement = false;
        temp.forEach(t => {
          if (t === element) {
            isElement = true;
            i--;
          }
        });
        if (!isElement) {
          temp.push(element);
        }
      }
      this.tempBtnOperations = temp;
    } else {
      this.tempBtnOperations = this.btnOperations;
    }
  }

  public selectItem(item: { text: string, total: string }) {
    this.formGroup.get('input')?.setValue(item.text);
  }

  public clickBtn(text: string, event: any) {
    console.log(event.keyCode, event.which);
    // const char = String.fromCharCode(event.which);
    const text2 = this.formGroup.get('input')?.value;
    const pattern = new RegExp('[/*+-]');
    if (event.keyCode === 13 || (text2 && text2[text2.length - 1] === text && pattern.exec(text))){
      event.preventDefault();
    } else {
      const control = this.formGroup.get('input');
      control?.setValue(control.value + text);
    }
  }

}
