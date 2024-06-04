import { envs } from '@/config/env';
import { ErrorBody } from '@/types/ErrorBody';
import { CommonResponseBody } from '@/types/CommonResponseBody';
import express from 'express';
import { matches } from '@/utils';
import { Message, messageMatcher } from '../types/Message';
import { RequestBody } from '../utils';
const router = express.Router();

const { MESSAGE_ENDPOINT } = envs;

//* Index
router.get(
    "/",
    (req, res) => {
        /* #swagger.responses[200] = {
            content: {
                  "application/json": {
                    ok: true,
                    code: 200,
                    data: [
                        {
                            
                        },
                        {
                            
                        }
                    ]
                }
            }
          }
        */
        /* #swagger.responses[500] = {
            content: {
                "application/json": {
                    ok: false,
                    code: 500,
                    data: {
                        message: "¡Ha ocurrido un problema inesperado!"
                    } 
                }
            }
          }
        */
        fetch(MESSAGE_ENDPOINT)
            .then(response => response.json())
            .then(messages => {
                if (Array.isArray(messages)) {
                    const CODE = 200;
                    const response = new CommonResponseBody(
                        true,
                        CODE,
                        messages
                    )
                    res.status(CODE).send(response);
                } else {
                    const CODE = 500;
                    const error: ErrorBody = {
                        private: "La lista de mensajes no pasa el typecheck de array en Index",
                        public: new CommonResponseBody(
                            false,
                            CODE,
                            {
                                message: "¡Ha ocurrido un problema inesperado!"
                            }
                        )
                    }
                    console.log(error.private);
                    res.status(CODE).send(error.public);
                }
            }).catch(err => {
                const CODE = 500;
                const error: ErrorBody = {
                    private: "Error inesperado en llamado fetch en Index",
                    public: new CommonResponseBody(
                        false,
                        CODE,
                        {
                            message: "¡Ha ocurrido un problema inesperado!"
                        }
                    ),
                    errorObject: err
                }
                console.log(error.private);
                console.error(error.errorObject)
                res.status(CODE).send(error.public);
            })
    }
);

//* Show
router.get(
    "/:id",
    (req, res) => {
        /* #swagger.responses[200] = {
                content: {
                    "application/json": {
                        ok: false,
                        code: 200,
                        data: {
                            
                        }
                    }
                }
            }
        */
        /* #swagger.responses[500] = {
            content: {
                "application/json": {
                    ok: false,
                    code: 500,
                    data: {
                        message: "¡Ha ocurrido un problema inesperado!"
                    } 
                }
            }
          }
        */
        fetch(
            `${MESSAGE_ENDPOINT}${req.params.id}/`
        ).then(response => response.json())
        .then(message => {
            const CODE = 200;
            const response = new CommonResponseBody(
                true,
                CODE,
                message
            )
            res.status(CODE).send(response);
        }).catch(err => {
            const CODE = 500;
    
            const error: ErrorBody = {
                private: "Error inesperado en llamado fetch en Show",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "¡Ha ocurrido un problema inesperado!"
                    }
                ),
                errorObject: err
            }
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
        })
    }
);

//* ShowList
router.get(
    "/list/:ids",
    (req, res) => {
        /* #swagger.responses[200] = {
            content: {
                  "application/json": {
                    ok: true,
                    code: 200,
                    data: [
                        {
                            
                        },
                        {
                            
                        }
                    ]
                }
            }
          }
        */
        /* #swagger.responses[500] = {
            content: {
                "application/json": {
                    ok: false,
                    code: 500,
                    data: {
                        message: "¡Ha ocurrido un problema inesperado!"
                    } 
                }
            }
          }
        */
        fetch(
            `${MESSAGE_ENDPOINT}list/${req.params.ids}/`
        ).then(response => response.json())
        .then(messages => {
                res.status(200).send(messages);
        }).catch(err => {
            const CODE = 500;
    
            const error: ErrorBody = {
                private: "Error inesperado en llamado fetch en ShowList",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "¡Ha ocurrido un problema inesperado!"
                    }
                ),
                errorObject: err
            }
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
        })
    }
);

//* Store
router.post(
    "/",
    (req, res) => {
        /* #swagger.responses[201] = {
                content: {
                    "application/json": {
                        ok: false,
                        code: 201,
                        data: {
                            
                        }
                    }
                }
            }
        */
        /* #swagger.responses[422] = {
            content: {
                "application/json": {
                    ok: false,
                    code: 422,
                    data: {
                        message: "La forma del cuerpo no coincide con la forma de Message"
                    } 
                }
            }
          }
        */
        /* #swagger.responses[500] = {
            content: {
                "application/json": {
                    ok: false,
                    code: 500,
                    data: {
                        message: "¡Ha ocurrido un problema inesperado!"
                    } 
                }
            }
          }
        */
        const message: Message & RequestBody = req.body;

        if (!matches(message, messageMatcher)) {
            const CODE = 422;
            
            const error: ErrorBody = {
                private: "Error inesperado en llamado fetch en Store",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "La forma del cuerpo no coincide con la forma de Message"
                    }
                )
            }
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
            return;
        }
        
        fetch(
            MESSAGE_ENDPOINT,
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(message)
            }
        ).then(response => (console.log(response), response.json()))
        .then(message => {
            if (matches(message, messageMatcher)) {
                const response = new CommonResponseBody(
                    true,
                    201,
                    message
                )
                res.status(201).send(response);
            } else {
                const CODE = 500;
                const error: ErrorBody = {
                    private: "El mensaje retornado no pasa el typecheck en Store",
                    public: new CommonResponseBody(
                        false,
                        CODE,
                        {
                            message: "¡Ha ocurrido un problema inesperado!"
                        }
                    )
                }
                console.log(message);
                console.log(error.private);
                res.status(CODE).send(error.public);
            }
        }).catch(err => {
            const CODE = 500;

            const error: ErrorBody = {
                private: "Error inesperado en llamado fetch en Store",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "¡Ha ocurrido un problema inesperado!"
                    }
                ),
                errorObject: err
            }
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
        })
    }
)

//* Update
router.put(
    "/:id",
    (req, res) => {
        /* #swagger.responses[200] = {
                content: {
                    "application/json": {
                        ok: false,
                        code: 200,
                        data: {
                            
                        }
                    }
                }
            }
        */
        /* #swagger.responses[500] = {
            content: {
                "application/json": {
                    ok: false,
                    code: 500,
                    data: {
                        message: "¡Ha ocurrido un problema inesperado!"
                    } 
                }
            }
          }
        */
        fetch(
            `${MESSAGE_ENDPOINT}${req.params.id}/`,
            {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(req.body)
            }
        ).then(response => (console.log(response), response.json()))
        .then(message => {
            if (matches(message, messageMatcher)) {
                const response = new CommonResponseBody(
                    true,
                    200,
                    message
                )
                res.status(200).send(response);
            } else {
                const CODE = 500;
                const error: ErrorBody = {
                    private: "El mensaje retornado no pasa el typecheck en Update",
                    public: new CommonResponseBody(
                        false,
                        CODE,
                        {
                            message: "¡Ha ocurrido un problema inesperado!"
                        }
                    )
                }
                console.log(message);
                console.log(error.private);
                res.status(CODE).send(error.public);
            }
        }).catch(err => {
            const CODE = 500;

            const error: ErrorBody = {
                private: "Error inesperado en llamado fetch en Update",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "¡Ha ocurrido un problema inesperado!"
                    }
                ),
                errorObject: err
            }
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
        })
    }
)

//* Delete
router.delete(
    "/:id",
    (req, res) => {
        /* #swagger.responses[200] = {
                content: {
                    "application/json": {
                        ok: false,
                        code: 200,
                        data: {
                            
                        }
                    }
                }
            }
        */
        /* #swagger.responses[500] = {
            content: {
                "application/json": {
                    ok: false,
                    code: 500,
                    data: {
                        message: "¡Ha ocurrido un problema inesperado!"
                    } 
                }
            }
          }
        */
        fetch(
            `${MESSAGE_ENDPOINT}${req.params.id}/`,
            {
                method: "DELETE"
            }
        ).then(response => (console.log(response), response.json()))
        .then(message => {
            if (matches(message, messageMatcher)) {
                const response = new CommonResponseBody(
                    true,
                    200,
                    message
                )
                res.status(200).send(response);
            } else {
                const CODE = 500;
                const error: ErrorBody = {
                    private: "El mensaje retornado no pasa el typecheck en Delete",
                    public: new CommonResponseBody(
                        false,
                        CODE,
                        {
                            message: "¡Ha ocurrido un problema inesperado!"
                        }
                    )
                }
                console.log(message);
                console.log(error.private);
                res.status(CODE).send(error.public);
            }
        }).catch(err => {
            const CODE = 500;

            const error: ErrorBody = {
                private: "Error inesperado en llamado fetch en Delete",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "¡Ha ocurrido un problema inesperado!"
                    }
                ),
                errorObject: err
            }
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
        })
    }
)


export default router;