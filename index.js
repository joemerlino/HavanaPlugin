
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
