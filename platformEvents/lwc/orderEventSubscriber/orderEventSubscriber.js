import { LightningElement } from 'lwc';
import { subscribe, onError, setDebugFlag, isEmpEnabled } from 'lightning/empApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import SystemModstamp from '@salesforce/schema/Account.SystemModstamp';

export default class OrderEventSubscriber extends LightningElement {
    isSubscribeDisabled = false;
    isUnsubscribeDisabled = !this.isSubscribeDisabled;

    subscriptionResgistered
    isRendered = false;
    renderedCallback() {
        if (!this.isRendered) {
            this.isRendered = true;
            this.handleSubscribe();
        }
    }

    handleSubscribe() {
        subscribe('/event/Order_Event__e', -1, (response) => {
            try
            {
                console.log('Event received.', JSON.stringify(response));
                this.toastMessage('success', 'sticky', response.data.payload.Order_Number__c);
            } catch(e) { console.log(e.message, e.stack); }
        }).then((subscription) => {
            console.log('Successfully subscribed.', subscription);
            this.subscriptionResgistered = subscription;
        });
    }

    toastMessage(variant, mode, message) {
        this.dispatchEvent(new ShowToastEvent({
            variant: variant,
            mode: mode,
            title: 'Information received:',
            message: message,
        }))
    }
}