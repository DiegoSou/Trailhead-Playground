import { LightningElement, api } from 'lwc';
import simpleCustomLookupPopupModal from 'c/simpleCustomLookupPopupModal';

export default class SimpleCustomLookupPopup extends LightningElement {
    selectedRecord;

    @api
    async callModal(params)
    {
        try
        {
            this.selectedRecord = await simpleCustomLookupPopupModal.open({ label: 'Resultados da busca', params: params });
            this.dispatchEvent(new CustomEvent('customlookupselection'));
        } catch (e) { console.log(e.message, e.stack); }
    }

    @api
    getSelected()
    {
        if (this.selectedRecord) {
            return { ...this.selectedRecord };
        } else {
            return null;
        }
    }
}