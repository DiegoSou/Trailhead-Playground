import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class SimpleCustomLookupPopupModal extends LightningModal {
    @api params;
    selectedTab = '';
    inputSearchString = '';
    isRendered = false;

    connectedCallback() {
        this.selectedTab = this.params.firstRecords?.length > 0 ? 'tabRecente' : 'tabTodos';
        this.inputSearchString = this.params.searchString;
    }

    renderedCallback() {
        if (!this.isRendered) this.isRendered = true;
    }

    get useHeaderInBody() {
        return this.params.useHeaderInBody;
    }

    get useDefaultHeader() {
        return !this.params.useHeaderInBody;
    }

    get inputLabel() {
        return this.params.inputLabel;
    }

    get hasFirstRecords() {
        return this.params.firstRecords?.length > 0;
    }

    get hasAllRecords() {
        return this.params.allRecords?.length > 0;
    }

    get firstRecords() {
        try
        {
            var searchString = this.inputSearchString;
            if (searchString.length > 0) {
                var filteredData = this.params.firstRecords.filter(function(item) { return item.label.toLowerCase().includes(searchString.toLowerCase());});
                return filteredData;
            } else {
                return this.params.firstRecords;
            }
        }
        catch (e) { console.log(e.message, e.stack); }
    }

    get allRecords() {
        try
        {
            var searchString = this.inputSearchString;
            if (searchString.length > 0) {
                var filteredData = this.params.allRecords.filter(function(item) { return item.label.toLowerCase().includes(searchString.toLowerCase());});
                return filteredData;
            } else {
                return this.params.allRecords;
            }
        }
        catch (e) { console.log(e.message, e.stack); }
    }

    handleClose() {
        this.close(null);
    }

    handleSelectedRecord(event) {
        try
        {
            var index = Number(event.currentTarget.dataset.value);
            var record;

            this.selectedTab = this.template.querySelector('lightning-tabset').activeTabValue;
            if (this.selectedTab == 'tabRecente') {
                record = this.firstRecords[index];
            } else if (this.selectedTab == 'tabTodos') {
                record = this.allRecords[index];
            }

            // console.log('Record: ', JSON.stringify(record));
            this.close(record);
        }
        catch (e) { console.log(e.message, e.stack); }
    }

    handleInputSearchStringChange(event) {
        this.inputSearchString = event.target.value;
    }
}