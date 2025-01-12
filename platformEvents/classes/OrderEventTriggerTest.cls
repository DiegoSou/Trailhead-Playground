@IsTest
private class OrderEventTriggerTest {
	@IsTest
    static void triggerTest() {
		// GIVE
		Order_Event__e orderNewsEvent = new Order_Event__e(
        	Has_Shipped__c = true,
            Order_Number__c = '105'
        );
        
		// WHEN
		Test.startTest();
        Database.SaveResult sr = EventBus.publish(orderNewsEvent);
        Test.stopTest();
		
		// THEN
		System.assert(sr.isSuccess());
        List<Task> createdTasks = [SELECT Id FROM Task];
        SYstem.assert(createdTasks.size() == 1);
    }
}