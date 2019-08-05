import { AuthRule, AuthRuleItem } from "../db/schema";
import Registry from "./registry";
/**
 *
 *
 * @class RoleService
 */
class RoleService {
  /**
   *
   *
   * @memberof RoleService
   */
  listLevels = (): Promise<any> =>
    new Promise((resolve, reject) => {
      AuthRule.find()
        .then(auth => resolve(auth))
        .catch(err => reject(err));
    });
  /**
   *
   *
   * @memberof RoleService
   */
  listLevel = (id): Promise<any> =>
    new Promise((resolve, reject) => {
      AuthRule.find({ $or: [{ _id: id }, { name: id }] })
        .then(auth => resolve(auth))
        .catch(err => reject(err));
    });
  /**
   *
   *
   * @memberof RoleService
   */
  addLevel = ({ name, description }): Promise<any> =>
    new Promise((resolve, reject) => {
      AuthRule.create({
        name,
        description,
        status: 1
      })
        .then(auth => resolve(auth._id))
        .catch(err => reject(err));
    });
  /**
   *
   *
   * @memberof RoleService
   */
  updateLevel = ({ id, rule: { name, description, status } }): Promise<any> =>
    new Promise((resolve, reject) => {
      AuthRule.findOneAndUpdate(
        { _id: id },
        { name, description, status },
        { upsert: true, new: true, runValidators: true },
        (err, rule) => {
          if (err) return reject(err);
          resolve(rule._id);
        }
      );
    });
  /**
   *
   *
   * @memberof RoleService
   */
  deleteLevel = (id): Promise<any> =>
    new Promise((resolve, reject) => {
      AuthRule.remove({ $or: [{ _id: id }, { name: id }] })
        .then(auth => resolve(auth))
        .catch(err => reject(err));
    });
  /**
   *
   *
   * @memberof RoleService
   */
  listRules = (): Promise<any> =>
    new Promise((resolve, reject) => {
      AuthRuleItem.find()
        .then(auth => resolve(auth))
        .catch(err => reject(err));
    });
  /**
   *
   *
   * @memberof RoleService
   */
  listRule = (id): Promise<any> =>
    new Promise((resolve, reject) => {
      AuthRuleItem.find({ $or: [{ _id: id }, { name: id }] })
        .then(auth => resolve(auth))
        .catch(err => reject(err));
    });
  /**
   *
   *
   * @memberof RoleService
   */
  listRulesByLevel = (level): Promise<any> =>
    new Promise((resolve, reject) => {
      AuthRuleItem.find({ rule_name: level })
        .then(auth => resolve(auth))
        .catch(err => reject(err));
    });
  /**
   *
   *
   * @memberof RoleService
   */
  addRule = ({ name, description, type, level, data }): Promise<any> =>
    new Promise((resolve, reject) => {
      AuthRule.create({
        name,
        description,
        status: 1
      })
        .then(auth => resolve(auth._id))
        .catch(err => reject(err));
    });
  /**
   *
   *
   * @memberof RoleService
   */
  updateRule = ({ id, rule: { name, description, status } }): Promise<any> =>
    new Promise((resolve, reject) => {
      AuthRule.findOneAndUpdate(
        { _id: id },
        { name, description, status },
        { upsert: true, new: true, runValidators: true },
        (err, rule) => {
          if (err) return reject(err);
          resolve(rule._id);
        }
      );
    });
  /**
   *
   *
   * @memberof RoleService
   */
  deleteRule = (id): Promise<any> =>
    new Promise((resolve, reject) => {
      AuthRule.remove({ $or: [{ _id: id }, { name: id }] })
        .then(auth => resolve(auth))
        .catch(err => reject(err));
    });
}

export default Registry.createWithEnvelope<RoleService>(RoleService);
