// @flow
export class Group {
  _id: string;
  constructor (id: string) {
    this._id = id;
  }
  get id ():string {
    return this._id;
  }

}
