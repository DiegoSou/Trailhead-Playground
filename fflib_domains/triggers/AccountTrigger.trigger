trigger AccountTrigger on Account (
    before insert, 
    before update,
    after insert,
    after update,
    before delete,
    after delete,
    after undelete
) {
    if (Trigger.isBefore && (Trigger.isInsert || Trigger.isUpdate)) {
        for (Account accountRecord : (List<Account>) Trigger.new) {
            
            // Account External Id tracking by Account Number.
            if (Trigger.isInsert && (accountRecord.AccountNumber != null)) {
                accountRecord.ExternalId__c = accountRecord.AccountNumber;
            } else if (Trigger.isInsert && (accountRecord.ExternalId__c != null)) {
                accountRecord.AccountNumber = accountRecord.ExternalId__c;
            } else if (Trigger.isUpdate) {
                Boolean accountNumberChanged = accountRecord.AccountNumber != Trigger.oldMap.get(accountRecord.Id).get('AccountNumber');
                Boolean accountExtIdChanged = accountRecord.ExternalId__c != Trigger.oldMap.get(accountRecord.Id).get('ExternalId__c');
                Boolean bothChanged = accountNumberChanged && accountExtIdChanged;

                if (bothChanged) {
                    accountRecord.ExternalId__c = accountRecord.AccountNumber;
                } else if (accountNumberChanged) {
                    accountRecord.ExternalId__c = accountRecord.AccountNumber;
                } else if (accountExtIdChanged) {
                    accountRecord.AccountNumber = accountRecord.ExternalId__c;
                }
            }

            // Account Parent Id tracking by ParentExternalId__c.
            if (Trigger.isInsert && (accountRecord.ParentExternalId__c != null)) {
                accountRecord.ParentId = [SELECT Id FROM Account WHERE ExternalId__c = :accountRecord.ParentExternalId__c].Id;
            } else if (Trigger.isInsert && (accountRecord.ParentId != null)) {
                accountRecord.ParentExternalId__c = [SELECT ExternalId__c FROM Account WHERE Id = :accountRecord.ParentId].ExternalId__c;
            } else if (Trigger.isUpdate) {
                Boolean parentExtIdChanged = accountRecord.ParentExternalId__c != Trigger.oldMap.get(accountRecord.Id).get('ParentExternalId__c');
                Boolean parentIdChanged = accountRecord.ParentId != Trigger.oldMap.get(accountRecord.Id).get('ParentId');
                Boolean bothChanged = parentExtIdChanged && parentIdChanged;

                if (bothChanged) {
                    accountRecord.ParentId = [SELECT Id FROM Account WHERE ExternalId__c = :accountRecord.ParentExternalId__c].Id;
                } else if (parentExtIdChanged) {
                    accountRecord.ParentId = [SELECT Id FROM Account WHERE ExternalId__c = :accountRecord.ParentExternalId__c].Id;
                } else if (parentIdChanged) {
                    accountRecord.ParentExternalId__c = [SELECT ExternalId__c FROM Account WHERE Id = :accountRecord.ParentId].ExternalId__c;
                }
            }
        }
    }
}