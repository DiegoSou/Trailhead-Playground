/** 
 * @author Diego
 * @description Lookup input objectives:
 * Search records selecting custom objects with their icons and labels 
 * Send custom events to parent
*/

import { LightningElement, api } from 'lwc';

export default class CustomLookupInput extends LightningElement 
{
    @api label; // Ex: 'Example'
    @api value; // Ex: '0'
    @api selectedObject; // Ex: 'Account'
    @api selectedObjectLabel;
    @api selectedObjectIcon;
    @api selectedObjectPlaceholder;
    
    @api selectedResult; // Ex: { name: 'Example', value: '0' }
    
    @api objectsToSearch // Ex: ['Account'];
    @api objectLabelByObjectMap // Ex: { 'Account': 'Conta' };
    @api objectIconByObjectMap // Ex: { 'Account': 'standard:account' };

    @api searchTerm = '';
    @api searchResults;

    @api disabled;
    
    mouseOverObjectResults
    mouseOverSearchResults;

    //
    // gets
    //

    get availableObjects()
    {
        let objArray = [];
        for (let objApi of this.objectsToSearch)
        {
            if (this.selectedObject == objApi) continue;
            objArray.push({apiName: objApi, label: this.objectLabelByObjectMap[objApi], icon: this.objectIconByObjectMap[objApi]});
        }
        return objArray;
    }

    get haveMoreOneSObject()
    {
        return this.objectsToSearch.length > 1;
    }

    //
    // DOM Event handlers
    //

    // Object Selection

    selectObjectInputClick(e)
    {
        this.template.querySelector('[data-id="search-input-menu"]').classList.remove('slds-is-open');
        this.template.querySelector('[data-id="select-object-menu"]').classList.toggle('slds-is-open');
    }

    selectObjectInputBlur(e)
    {
        if (this.mouseOverObjectResults) return;
        this.template.querySelector('[data-id="select-object-menu"]').classList.remove('slds-is-open');
    }

    mouseEnterObjectResults(e)
    {
        this.mouseOverObjectResults = true;
    }

    mouseLeaveObjectResults(e)
    {
        this.mouseOverObjectResults = false;
    }

    // Search Results

    searchResultInputClick(e)
    {
        if (this.haveMoreOneSObject) {
            this.template.querySelector('[data-id="select-object-menu"]').classList.remove('slds-is-open');
        }
        this.template.querySelector('[data-id="search-input-menu"]').classList.add('slds-is-open');   
    }

    searchResultInputBlur(e)
    {
        if (this.mouseOverSearchResults) return;
        this.template.querySelector('[data-id="search-input-menu"]').classList.remove('slds-is-open');
    }

    mouseEnterSearchResults(e)
    {
        this.mouseOverSearchResults = true;
    }

    mouseLeaveSearchResults(e)
    {
        this.mouseOverSearchResults = false;
    }

    //
    // Custom Events
    //

    chooseObject(e)
    {
        this.dispatchEvent(new CustomEvent('chooseobject', {
            detail: e.currentTarget.dataset.id
        }));
    }

    chooseResult(e)
    {
        this.dispatchEvent(new CustomEvent('chooseresult', {
            detail: e.currentTarget.dataset.id
        }));
    }

    removeSelectedResult()
    {
        this.dispatchEvent(new CustomEvent('removeselectedresult'));
    }

    searchResultInputChange(e)
    {
        this.dispatchEvent(new CustomEvent('inputchange', {
            detail: e.target.value
        }));
    }

    showResultsClick() 
    {
        this.dispatchEvent(new CustomEvent('openmodal'));

        // Focus on input again
        this.template.querySelector('[data-id="search-input-text"]').focus();
    }
}