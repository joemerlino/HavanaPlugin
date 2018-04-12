# Havana Plugin
Questo progetto realizza parte del prodotto _Havana_ per il corso di Ingegneria del Software 17/18 tenuto all'Università degli Studi di Padova della LT in Informatica.

Esso è un _plugin_ per il framework Kibana v6.2.3, non può essere eseguito singolarmente ma necessita di una istanza di Kibana. Quest'ultima deve essere a sua volta collegata ad un'istanza di Elasticsearch.

Lo sviluppo è stato fatto eseguendo Kibana ed Elasticsearch localmente.

## Installazione ed avvio del plugin
1. Scaricare Kibana dalla [repository](https://github.com/elastic/kibana) Elastic ufficiale e configurarlo aprendo un terminale dalla cartella locale seguito dall'invocazione del comando `yarn kbn bootstrap`.
2. Scaricare il contenuto della repository in una cartella locale, da accostare alla cartella con Kibana che dovrà chiamarsi `kibana`.
3. Aprire un'istanza di terminale dalla cartella del plugin scaricato
4. Invocare il comando `npm install`.
5. Dopo aver concluso l'installazione dei moduli node, invocando il comando `npm start` verrà avviato Kibana con il plugin incorporato all'interno.
6. Aprire un browser e digitare localhost:5601
7. Recarsi nella sezione del menu a sinistra _HavanaPlugin_ per utilizzare il plugin