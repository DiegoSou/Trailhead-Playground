import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class CustomLookupModal extends LightningModal 
{
    @api label;

    // Ex: 'Burlington Textiles'
    @api searchTerm;

    // Ex: 'Account'
    @api selectedObject;

    // Ex: 'Conta'
    @api selectedObjectLabel;

    // Ex: 'standard:account'
    @api selectedObjectIcon;

    @api selectedObjectPlaceholder;

    // Ex: [SObject, SObject]
    @api searchResults;

    @api useHeaderInBody;
    
    selectedTab = 'tabTodos';
    isRendered = false;

    //
    // gets
    //

    get noResults()
    {
        return this.searchResults.length == 0;
    }

    get useDefaultHeader()
    {
        return !this.useHeaderInBody;
    }

    get viewSearchResults() 
    {
        if (this.searchTerm) {
            return this.searchResults.filter((result) => result.label.toLowerCase().includes(this.searchTerm.toLowerCase())).sort((a, b) => a.label.toLowerCase().indexOf(this.searchTerm.toLowerCase()) - b.label.indexOf(this.searchTerm.toLowerCase()));
        } else {
            return this.searchResults;
        }
    }

    //
    // Lifecycle hooks
    //

    renderedCallback() 
    {
        if (!this.isRendered) this.isRendered = true;
    }

    //
    // Custom Events
    //

    handleInput(e)
    {
        this.searchTerm = e.target.value;
    }

    handleChooseResult(e)
    {
        this.close(e.detail);
    }
}