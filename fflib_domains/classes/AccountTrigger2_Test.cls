@IsTest
private class AccountTrigger2_Test 
{
    @IsTest
    static void triggerTest() 
    {
        // GIVE
        fflib_SObjectDomain.getTriggerEvent(AccountsTriggerHandler.class).disableAll();
        Account acc = new Account(Name = 'Test Account');

        // WHEN
        insert acc;

        // THEN
    }
}