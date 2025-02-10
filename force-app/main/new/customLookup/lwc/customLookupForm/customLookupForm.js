import { LightningElement, api } from 'lwc';
import customLookupModal from 'c/customLookupModal';

export default class CustomLookupForm extends LightningElement 
{
    @api value; // Ex: '0'

    // Custom Lookup Imput Params
    @api label; // Ex: 'Select record'
    @api objectsToSearch; // Ex: ['Account'];
    @api objectLabelByObjectMap; // Ex: { 'Account': 'Conta' };
    @api objectIconByObjectMap; // Ex: { 'Account': 'standard:account' };
    @api searchResults; // Ex: { 'Account': [] } 

    firstRecords = [];
    allRecords = [];

    // Ex: 'Burlington Textiles'
    @api searchTerm = '';

    // Ex: 'Account'
    @api selectedObject;

    // Ex: 'Conta'
    @api selectedObjectLabel;

    @api modalUseHeaderInBody = false;
    @api disabled = false;
    
    isChanging = false;

    //
    // gets
    //

    get selectedObjectLabel()
    {
        return this.objectLabelByObjectMap[this.selectedObject];
    }

    get selectedObjectIcon()
    {
        return this.objectIconByObjectMap[this.selectedObject];
    }

    get selectedObjectPlaceholder()
    {
        return 'Pesquisar por '+this.selectedObjectLabel+"(s)";
    }

    get viewSelectedResult()
    {
        try {
            if (this.value) {
                return this.searchResults[this.selectedObject].find((v) => v.value == this.value);
            }
            return undefined;
        } catch (e) { 
            console.log(e.message, e.stack); 
        }
    }

    get viewFirstRecords() 
    {
        try {
            if (this.searchResults[this.selectedObject]) {
                this.firstRecords = [...this.searchResults[this.selectedObject].slice(0, 4)];
                if (this.searchTerm) {
                    return this.firstRecords.filter((v) => v.label.toLowerCase().includes(this.searchTerm.toLowerCase())).sort((a, b) => a.label.toLowerCase().indexOf(this.searchTerm.toLowerCase()) - b.label.indexOf(this.searchTerm.toLowerCase()));
                }
                return this.firstRecords;
            }

            return [];
        } catch (e) {
            console.log(e.message, e.stack);
        }
    }

    get viewAllRecords() 
    {
        try {
            if (this.searchResults[this.selectedObject]) {
                this.allRecords = [...this.searchResults[this.selectedObject]];
                return this.allRecords;
            }
        } catch (e) {
            console.log(e.message, e.stack);
        }
    }

    //
    // Lifecycle Hooks
    //

    connectedCallback()
    {
        this.selectedObject = this.objectsToSearch[0];
    }

    //
    // Event handlers
    //

    async handleOpenModal(e)
    {
        this.value = await customLookupModal.open({
            label: this.label,
            searchTerm: this.searchTerm,
            selectedObject: this.selectedObject,
            selectedObjectLabel: this.selectedObjectLabel,
            selectedObjectIcon: this.selectedObjectIcon,
            selectedObjectPlaceholder: this.selectedObjectPlaceholder,
            searchResults: this.viewAllRecords,
            useHeaderInBody: this.modalUseHeaderInBody
        });
    }

    handleChooseObject(e)
    {
        console.log('choose object: ', e.detail);
        
        this.selectedObject = e.detail;
        this.value = '';
        this.searchTerm = '';
    }

    handleChooseResult(e)
    {
        this.value = e.detail;
    }

    handleRemoveSelectedResult(e) 
    {
        this.value = '';
        this.searchTerm = '';
    }

    handleInputChange(e)
    {
        this.searchTerm = e.detail;
    }
}