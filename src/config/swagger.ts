import { CommonResponseBody } from '@/types/CommonResponseBody';
import swaggerAutogen from 'swagger-autogen';
import { Message as IMessage } from '../types/Message';

const Message: IMessage = {
  name: "Persona Real",
  email: "persona@mundo.com",
  message: "Mensaje de relleno"
};

const doc = {
  info: {
    title: 'Mensajes',
    description: 'API de Mensajes para AR Detailing'
  },
  host: 'localhost:8000',
  components: {
    schemas: {
      Message
    }
  }
};

const outputFile = '../../openapi-contract.json';
const routes = [
  '../routes/message.ts'
];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({openapi: "3.0.3"})(outputFile, routes, doc);