# k6scripts
Repositori on es guarda el codi utilitzat per a la elaboració del Treball Final de Grau, especificament el test de càrrega utilitzat per a fer load-testing a dos servidors d'internet.

Per a executar, es fa amb la seguent comanda al powershell:
```bash
$env:K6_CLOUD={0}; $env:K6_PRIMER={1};$env:K6_MIG={2}; k6 run .\script.js
```
on {0},{1},{2} s'han de cambiar per enters(Els brakets inclosos). {0} s'ha de cambiar per 0 o 1, ja que serveix per escollit entre la primera o la segona ip dins de ipfile.json

{1} i {2} es cambien per el numero que usuaris virtuals es vulguin tenir al minut 1 de l'execució del programa, i al minut 2 de l'execució del programa.

Cal cambiar les IPs de ipfile.json en cas de voler posar altres servidors com a targets.