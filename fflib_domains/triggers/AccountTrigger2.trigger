trigger AccountTrigger2 on Account (
    before insert, 
    before update,
    after insert,
    after update,
    before delete,
    after delete,
    after undelete
) {
    fflib_SObjectDomain.triggerHandler(AccountsExternalIdTriggerHandler.class);
}