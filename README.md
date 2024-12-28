```
Referência de comandos para criar uma scratch:
sf org create scratch -d -f config/project-scratch-def.json -a trailhead-playground-scratch-org

O arquivo project-scratch-def.json possui a configuração da scratch, que seja o Name e outras flags...

Após criar a scratch, utilize para abrir um servidor de desenvolvimento lwc local:
sf lightning dev app

---
Neste commit

Alterações:
Criada pasta chamada "data" para armazenar os registros que seriam importados para o teste de uma funcionalidade.

Para importar: 
sf data import tree -p data/sample-data-ref.json

O arquivo sample-data-ref.json possui a configuração para importar as contas e salvar as referências, e pros contatos, resolver as referências. 

Para remover os registros:
sf data delete record --sobject Contact --record-id id;
sf data delete record --sobject Contact --record-id id;
sf data delete record --sobject Contact --record-id id;
sf data delete record --sobject Contact --record-id id;
sf data delete record --sobject Contact --record-id id;
sf data delete record --sobject Account --record-id id;
sf data delete record --sobject Account --record-id id;
sf data delete record --sobject Account --record-id id;
sf data delete record --sobject Account --record-id id;
sf data delete record --sobject Account --record-id id;
```