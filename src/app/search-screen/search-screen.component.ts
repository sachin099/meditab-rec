import { Component, OnInit } from '@angular/core';
import { SearchScreenDataModel } from './search-screen-data.model';

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.component.html',
  styleUrls: ['./search-screen.component.css']
})
export class SearchScreenComponent implements OnInit {

  constructor() { }

  public searchScreenDataModel = new SearchScreenDataModel();
  searchBox = '';

  ngOnInit(): void {

  }

  onEnterPress(event) {
    this.searchBox = '';
    if (this.searchScreenDataModel.firstName.value && this.searchScreenDataModel.firstName.value != '') {
      this.searchBox = this.searchBox + this.searchScreenDataModel.firstName.symbol + this.searchScreenDataModel.firstName.value;
    }
    else {
      this.removeField(this.searchScreenDataModel.firstName.symbol, this.searchScreenDataModel.firstName.value);
    }
    if (this.searchScreenDataModel.lastName.value && this.searchScreenDataModel.lastName.value != '') {
      this.searchBox = this.searchBox + this.searchScreenDataModel.lastName.symbol + this.searchScreenDataModel.lastName.value;
    }
    else {
      this.removeField(this.searchScreenDataModel.lastName.symbol, this.searchScreenDataModel.lastName.value);
    }
    if (this.searchScreenDataModel.chartNo.value && this.searchScreenDataModel.chartNo.value != '') {
      this.searchBox = this.searchBox + this.searchScreenDataModel.chartNo.symbol + this.searchScreenDataModel.chartNo.value;
    }
    else {
      this.removeField(this.searchScreenDataModel.chartNo.symbol, this.searchScreenDataModel.chartNo.value);
    }
    if (this.searchScreenDataModel.addressOne.value && this.searchScreenDataModel.addressOne.value != '') {
      this.searchBox = this.searchBox + this.searchScreenDataModel.addressOne.symbol + this.searchScreenDataModel.addressOne.value;
    }
    else {
      this.removeField(this.searchScreenDataModel.addressOne.symbol, this.searchScreenDataModel.addressOne.value);
    }
  }

  removeField(symbol, field) {
    if (this.searchBox && this.searchBox != '') {
      this.searchBox = this.searchBox.replace(field, '').replace(symbol, '');
    }
  }

  changeInSearchField(event) {
    if (this.searchBox && this.searchBox != '') {
      if(this.searchBox.includes('!') || this.searchBox.includes('@') || this.searchBox.includes('#') || this.searchBox.includes('$')) {
        this.updateFields(this.searchBox);
      }
      else {
        this.searchBox = '!' + this.searchBox;
        this.updateFields(this.searchBox);
      }
    }
  }

  updateFields(searchBoxInput) {
    let searchVar = searchBoxInput;
    for (let i = 0; i < 4; i++) {
      if (searchVar[0] == this.searchScreenDataModel.firstName.symbol) {
        let value = searchVar.split(/[@#$]/);
        this.searchScreenDataModel.firstName.value = value[0].slice(1);
        searchVar = searchVar.replace(value[0], '');
      }
      if (searchVar[0] == this.searchScreenDataModel.lastName.symbol) {
        let value = searchVar.split(/[!#$]/);
        this.searchScreenDataModel.lastName.value = value[0].slice(1);
        searchVar = searchVar.replace(value[0], '');
      }
      if (searchVar[0] == this.searchScreenDataModel.chartNo.symbol) {
        let value = searchVar.split(/[@!$]/);
        this.searchScreenDataModel.chartNo.value = value[0].slice(1);
        searchVar = searchVar.replace(value[0], '');
      }
      if (searchVar[0] == this.searchScreenDataModel.addressOne.symbol) {
        let value = searchVar.split(/[@#!]/);
        this.searchScreenDataModel.addressOne.value = value[0].slice(1);
        searchVar = searchVar.replace(value[0], '');
      }
    }
  }

  clearAll() {
    this.searchScreenDataModel.firstName.value = '';
    this.searchScreenDataModel.lastName.value = '';
    this.searchScreenDataModel.addressOne.value = '';
    this.searchScreenDataModel.chartNo.value = '';
    this.searchBox = '';
  }
}
