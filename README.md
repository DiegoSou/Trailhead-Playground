<h2>trail-playground-fillLookupByExtId</h2>

---

<h3>Modelagem de dados</h3>
    <ol>
        <li>Foi criado um novo campo em Clientes/Grupo Cliente (Account) para que seja armazenado o código externo (ExternalId__c)</li>
        <li>Foi criado um novo campo em Clientes (Account) para que seja armazenado o código do grupo cliente (ParentExternalId__c)</li>
        <li>Foi criado um novo campo em Chamados (Case) para que seja armazenado o código do cliente (AccountExternalId__c)</li>
    </ol>

<h3>Preenchimento dos dados</h3>
    <h4>Account</h4>
    <ol>
        <li>Name - É a razão social do cliente</li>
        <li>ExternalId__c - código do Cliente ou Grupo Cliente. Padrão CNPJ.</li>
        <li>AccountSource - External Referral</li>
        <li>AccountNumber - É o CNPJ do cliente</li>
        <li>ParentExternalId__c - código do Grupo Cliente</li>
        <li>RecordTypeId - Cliente ou Grupo Cliente</li>
    </ol>
    <h4>Case</h4>
    <ol>
        <li>AccountExternalId__c - Cliente ou Grupo Cliente</li>
    </ol>

<h3>Automações</h3>
    <h4>Account</h4>
    <ol>
        <li>ExternalId__c será preenchido por meio do campo AccountNumber, e vice-versa</li>
        <li>ParentId será preenchido por meio do campo ParentExternalId__c, e vice-versa</li>
    </ol>
    <h4>Case</h4>
    <ol>
        <li>AccountId será preenchido por meio do campo AccountExternalId__c, e vice-versa</li>
    </ol>
