# Havana Plugin - PoC
Questo progetto realizza una _Proof of Concept_ per il corso di Ingegneria del Software 17/18 tenuto all'Università degli Studi di Padova della LT in Informatica.

Esso è un _plugin_ per il framework Kibana v6.2.3, non può essere eseguito singolarmente ma necessita di una istanza di Kibana. Quest'ultima deve essere a sua volta collegata ad un'istanza di Elasticsearch.

Lo sviluppo è stato fatto eseguendo Kibana ed Elasticsearch localmente.

## Installazione ed avvio del plugin
1. Scaricare Kibana dalla repository elastic ufficiale e configurarlo aprendo un terminale dalla cartella locale seguito dall'invocazione del comando `yarn kbn bootstrap`.
2. Scaricare il contenuto della repository in una cartella locale, da accostare alla cartella con Kibana che dovrà chiamarsi 'kibana'.
3. Aprire un'istanza di terminale dalla cartella del plugin scaricato
4. Invocare il comando `npm install`.
5. Dopo aver concluso l'installazione dei moduli node, invocando il comando `npm start` verrà avviato Kibana con il plugin incorporato all'interno.
6. Recarsi nella cartella di Elasticsearch e avviare un'istanza invocando il comando `elasticsearch` dalla sottocartella bin.
7. Aprire un browser e digitare localhost:5601
8. Una volta avviata l'interfaccia di Kibana, dal menù di sinistra selezionare la voce 'Dev Tools'.
9. Scrivere nella console `PUT /rp/poc/1` e andare a capo.
10. Copiare il contenuto del file data.json ed incollarlo all'interno della console.
11. Eseguire l'intero comando e selezionare dal menù di sinistra la voce 'Havana Plugin'.
