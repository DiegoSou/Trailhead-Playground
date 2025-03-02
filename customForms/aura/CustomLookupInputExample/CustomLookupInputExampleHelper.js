// Arquivo: NewRecordFormHelper.js

({
    setLookupInfo : function(component, helper)
    {
        component.set('v.lookupInfo', {
            label: 'Selecione o cliente',
            objectsToSearch: ['Account', 'Case', 'Contact'],
            objectLabelByObjectMap: { 'Account': 'Conta', 'Case': 'Caso', 'Contact': 'Contato' },
            objectIconByObjectMap: { 'Account': 'standard:account', 'Case': 'standard:case', 'Contact': 'standard:contact' },
            searchResults: { 'Account': [], 'Case': [], 'Contact': [] }
        });
    },

    searchResults : function(component, helper)
    {
        var searchAccounts = component.get("c.searchAccounts");
        searchAccounts.setCallback(this, function(response) {
            try {
                if (response.getState() == 'SUCCESS')
                {
                    const accountsViewModel = response.getReturnValue().map((account) => { return { label: account.Name, value: account.Id }});
                    const lookupInfo = component.get('v.lookupInfo');
                    lookupInfo.searchResults['Account'] = accountsViewModel;
                    component.set('v.lookupInfo', lookupInfo);
                    component.set('v.searchResults', accountsViewModel);
                }
            } catch (e) { console.log(e.message, e.stack) }
        });

        var searchCases = component.get("c.searchCases");
        searchCases.setCallback(this, function(response) {
            try {
                if (response.getState() == 'SUCCESS')
                {
                    const csViewModel = response.getReturnValue().map((c) => { return { label: c.Subject, value: c.Id }});
                    const lookupInfo = component.get('v.lookupInfo');
                    lookupInfo.searchResults['Case'] = csViewModel;
                    component.set('v.lookupInfo', lookupInfo);
                    component.set('v.searchResults', csViewModel);
                }
            } catch (e) { console.log(e.message, e.stack) }
        });

        var searchContacts = component.get("c.searchContacts");
        searchContacts.setCallback(this, function(response) {
            try {
                if (response.getState() == 'SUCCESS')
                {
                    const contactsViewModel = response.getReturnValue().map((contact) => { return { label: contact.Name, value: contact.Id }});
                    const lookupInfo = component.get('v.lookupInfo');
                    lookupInfo.searchResults['Contact'] = contactsViewModel;
                    component.set('v.lookupInfo', lookupInfo);
                    component.set('v.searchResults', contactsViewModel);
                }
            } catch (e) { console.log(e.message, e.stack) }
        });

        $A.enqueueAction(searchAccounts);
        $A.enqueueAction(searchContacts);
        $A.enqueueAction(searchCases);
    }
})