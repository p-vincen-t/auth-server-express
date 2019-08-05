import { Client } from "../db/schema";
import Registry from "./registry";
import ClientError, { CLIENT_NOT_FOUND } from "./error/client.error";
/**
 *
 *
 * @class RoleService
 */
class ClientService {
    

//   addClient = (user, client): Promise<any> => new Promise((resolve, reject) => {
//     Token.findOneAndUpdate(
//         { user: user._id }, // find a token with that user
//         {
//           //save this token if not found
//           user: user._id,
//           token: jwt.sign({ id: user._id }, this._jwtSecret, {
//             expiresIn: 60 * 60 * 60
//           }),
//           client_id: client._id
//         }, // insert if doesn`t exist else update
//         { upsert: true, new: true, runValidators: true }, // options
//         (err, token) => {
//           // callback
//           if (err) reject(err);
//           else resolve(token);
//         }
//       )
//   })

  findClient = (_id: string): Promise<any> => new Promise((resolve, reject) => {
    Client.findById(_id)
        .then(c => {
          if (c) {
            resolve(c)
          } else {
              reject(new ClientError(CLIENT_NOT_FOUND))
          }          
        })
        .catch(err => reject(err));
  })
}

export default Registry.createWithEnvelope<ClientService>(ClientService);
