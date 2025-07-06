delete [SELECT Id FROM Account WHERE Id IN (
    '001Ov00000guzzzIAA',
    '001Ov00000gv000IAA',
    '001Ov00000gv001IAA',
    '001Ov00000gv002IAA',
    '001Ov00000gv003IAA',
    '001Ov00000gv004IAA',
    '001Ov00000gv005IAA'
)];

Account acc = new Account(
    Name = 'Biblioteca Estadual de Fortaleza Ltda.',
    AccountNumber = '34726205000170',
    AccountSource = 'External Refferal',
    Parent = new Account(ExternalId__c = '10')
);
insert acc;