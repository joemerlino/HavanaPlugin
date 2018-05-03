/*

* File : index.js
* Versione : 1.0.0
* Tipo : Javascript
* Data : 2018-03-20
* Autore : SWEefty Team
* E-mail : sweeftyteam@gmail.com
*
* Licenza : GPLv3
*
* Descrizione: entry point dell'applicazione, qui viene richiesta a Kibana
*              un'istanza di ElasticSearch e viene istanziato il Server API
*              insieme al plugin vero e propio
*
* Registro modifiche :
* Paolo Eccher || 2018-03-20 || Creazione file
*
*/


import exampleRoute from './server/routes/routes';
export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'stab-havana',
    uiExports: {

      app: {
        title: 'Havana Plugin',
        description: 'PoC SWEefty',
        main: 'plugins/stab-havana/app'
      },



    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },


    init(server, options) {
      // Add server routes and initalize the plugin here
      exampleRoute(server);
    }


  });
};
