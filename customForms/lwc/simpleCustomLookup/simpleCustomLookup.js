import { LightningElement, api, track } from 'lwc';

export default class SimpleCustomLookup extends LightningElement 
{
    isRendered;
    
    @api label = "";
    @api name = "";
    @api placeholder = "";
    @api value;

    @api firstRecords = [];
    @api allRecords = [];
    records = [];
    @api selectedRecord;
    
    searchString = "";
    @track showClose = false;
    
    @api disabled = false;
    @api required = false;
    @api requiredLabel = false;

    @api useHeaderInBody = false;
    exitingModal = false;

    renderedCallback() {
        try {
            if (this.value != null && !this.isRendered) {
                this.isRendered = true;

                let findSelected = this.allRecords.find((record) => { return record.value == this.value; });
                this.selectedRecord = { ...findSelected };
                this.searchString = findSelected.label;
                this.records = [];
                this.showClose = true;
                this.dispatchEvent(new CustomEvent('selectrecord', { detail: this.selectedRecord }));
            }
        } catch (e) { console.log(e.message, e.stack); }
    }

    search(event) {
        try {
            if (!this.exitingModal) {
                this.template.querySelector('c-custom-lookup-component-pop-up').callModal({
                    inputLabel: this.label,
                    searchString: event.target.value,
                    firstRecords: [...this.firstRecords],
                    allRecords: [...this.allRecords],
                    useHeaderInBody: this.useHeaderInBody
                });
                this.exitingModal = true;
            }
        } catch (e) { console.log(e.message, e.stack); }
    }

    handleBlur() {
        try {
            setTimeout(() => {
                if(this.selectedRecord == null || this.selectedRecord == undefined || this.selectedRecord == '') {
                    this.searchString = '';
                    this.showClose = false;
                    this.records = [];
                } else {
                    this.searchString = this.selectedRecord.label;
                    this.showClose = true;
                }
            },200);
        } catch (e) { console.log(e.message, e.stack); } 
    }

    handleFocus() {
        try {
            if (!this.exitingModal) {
                this.template.querySelector('c-simple-custom-lookup-popup').callModal({
                    inputLabel: this.label,
                    searchString: this.searchString,
                    firstRecords: [...this.firstRecords],
                    allRecords: [...this.allRecords],
                    useHeaderInBody: this.useHeaderInBody
                });
                this.exitingModal = true;
            }
        } catch (e) { console.log(e.message, e.stack); }
    }

    handlePopUpSelection() {
        try {
            this.exitingModal = false;
            let selectedRecord = this.template.querySelector('c-simple-custom-lookup-popup').getSelected();
            if (selectedRecord != null) {
                let records = this.allRecords;
                let findSelected = records.find(function(record) { return record.value === selectedRecord.value; });
                this.selectedRecord = { ...findSelected };
                this.searchString = findSelected.label;
                this.records = [];
            }
            this.dispatchEvent(new CustomEvent('selectrecord', { detail: this.selectedRecord }));
        } catch (e) { console.log(e.message, e.stack); }
    }

    clearSearch() {
        this.searchString = "";
        this.selectedRecord = null;
        this.records = [];
        this.showClose = false;

        this.dispatchEvent(new CustomEvent('clear'));
    }
}