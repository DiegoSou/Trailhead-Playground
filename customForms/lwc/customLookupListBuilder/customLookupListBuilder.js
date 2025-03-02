import { LightningElement, api } from 'lwc';

export default class CustomLookupListBuilder extends LightningElement 
{
    @api selectedObjectIcon;
    @api searchResults;

    chooseResult(e)
    {
        this.dispatchEvent(new CustomEvent('chooseresult', {
            detail: e.currentTarget.dataset.id
        }));
    }
}