import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { CurrecyProvider } from '../../providers/currecy/currecy';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedCurrency: any;
  currencyForm: FormGroup;
  values: any = [];
  formvalue: any;

  constructor(public navCtrl: NavController,
    public restservice: CurrecyProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController) {
    this.showCurrencyName();

    this.currencyForm = this.formBuilder.group({
      currencyform: [null, Validators.required],
      number: [null, Validators.compose([Validators.pattern('[0-9]*'), Validators.maxLength(10), Validators.minLength(10), Validators.required])],
    })
  }

  Formdata() {
    let displayAmount: any = "";
    this.formvalue = {
      number: this.currencyForm.value.number,
      Fromcurrency: this.currencyForm.value.currencyform
    }
    this.restservice.convertCurrency(this.formvalue.Fromcurrency).subscribe(value => {
      console.log("value", value);
      if (value.results) {
        Object.keys(value.results).forEach(element => {
          let displayValue = value.results[element]
          console.log("display", displayValue.val)
          displayAmount = this.formvalue.number * displayValue.val
          console.log("displayAmount", displayAmount)
        })
      }
      if (displayAmount) {
        this.displayConvertCurrency(displayAmount);
      }
    })
    console.log("formvalue", this.formvalue)
  }

  displayConvertCurrency(displayAmount) {
    const alert = this.alertCtrl.create({
      title: 'Currency Converted',
      subTitle: this.formvalue.number + "&nbsp;" + this.formvalue.Fromcurrency + "&nbsp;" + "=" + "&nbsp" + displayAmount + "&nbsp;" + "INR",
      buttons: ['OK']
    });
    alert.present();
  }

  showCurrencyName() {
    this.restservice.currencydata().subscribe(data => {
      if (data) {
        Object.keys(data.results).forEach(element => {
          this.values.push(data.results[element])
        });
      }

    })
  }
}
