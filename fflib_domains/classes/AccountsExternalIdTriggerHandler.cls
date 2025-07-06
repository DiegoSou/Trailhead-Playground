/** 
 * @author Diego
 */
public with sharing class AccountsExternalIdTriggerHandler extends fflib_SObjectDomain {
    
    public AccountsExternalIdTriggerHandler(List<SObject> sobjectList) 
    { 
        super(sobjectList); 
    }

    public override void onApplyDefaults()
    {
        for (Account accountRecord : (List<Account>) this.Records) 
        {
            accountRecord.DisplayName__c = (accountRecord.Name + ' | ' + accountRecord.AccountNumber).left(255);
            
            if (accountRecord.AccountNumber != null && accountRecord.ExternalId__c == null) {
                accountRecord.ExternalId__c = accountRecord.AccountNumber;
            } 
            else if (accountRecord.ExternalId__c != null && accountRecord.AccountNumber == null) {
                accountRecord.AccountNumber = accountRecord.ExternalId__c;
            }
        }
    }

    public override void onValidate()
	{
		for(Account accountRecord : (List<Account>) this.Records)
		{
            if (accountRecord.AccountNumber == null && accountRecord.ExternalId__c == null) 
            {
                accountRecord.AccountNumber.addError(error('A conta deve possuir um código ou cnpj.', accountRecord, Account.Fields.AccountNumber));
            }
		}
	}

    public override void onValidate(Map<Id, SObject> existingRecords) 
    {
        for (Account accountRecord : (List<Account>) this.Records)
        {
            if (accountRecord.AccountNumber == null && existingRecords.get(accountRecord.Id).get('AccountNumber') != null)
            {
                accountRecord.AccountNumber.addError(error('O código da conta não pode mudar para vazio.', accountRecord, Account.Fields.AccountNumber));
            }
        }
    }

    public override void onBeforeUpdate(Map<Id, SObject> existingRecords)
    {
        for (Account accountRecord : (List<Account>) this.Records)
        {
            Boolean accountNumberChanged = accountRecord.AccountNumber != existingRecords.get(accountRecord.Id).get('AccountNumber');
            Boolean accountExtIdChanged = accountRecord.ExternalId__c != existingRecords.get(accountRecord.Id).get('ExternalId__c');
            Boolean bothChanged = accountNumberChanged && accountExtIdChanged;

            if (bothChanged) {
                accountRecord.ExternalId__c = accountRecord.AccountNumber;
            } else if (accountNumberChanged) {
                accountRecord.ExternalId__c = accountRecord.AccountNumber;
            } else if (accountExtIdChanged) {
                accountRecord.AccountNumber = accountRecord.ExternalId__c;
            }
        }
    }
    
    public class Constructor implements fflib_SObjectDomain.IConstructable 
    {
        public fflib_SObjectDomain construct(List<SObject> sObjectList) 
        {
            return new AccountsExternalIdTriggerHandler(sobjectList);
        }
    }
}