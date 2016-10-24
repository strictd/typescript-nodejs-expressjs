'use strict';

import * as express from 'express';

import { IPerson } from '../../models/i-person';

module PlayerRoute {

  export class Info {

    public show(req: express.Request, res: express.Response, next: express.NextFunction) {
      let player = new IPerson();
      player.name = 'Strict Development';
      player.email = 'strictd';
      player.phone = '123-123-1234';
      player.canTextMessage = true;

      res.status(200).send(player);
    }

  }

}

export = PlayerRoute;
