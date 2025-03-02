public with sharing class CustomLookupExampleController {
    @AuraEnabled
    public static List<Account> searchAccounts() {
        try {
            return [SELECT Id, Name FROM Account];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage() + '| ' + e.getStackTraceString());
        }
    }
    
    @AuraEnabled
    public static List<Case> searchCases() {
        try {
            return [SELECT Id, CaseNumber, Subject FROM Case];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage() + '| ' + e.getStackTraceString());
        }
    }

    @AuraEnabled
    public static List<Contact> searchContacts() {
        try {
            return [SELECT Id, Name FROM Contact];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage() + '| ' + e.getStackTraceString());
        }
    }
}