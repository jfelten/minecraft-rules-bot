
export interface IBlock {
  on(eventName: string, func: Function): void;
}

export interface IEntity {

  on(eventName: string, func: Function): void;

}

export interface IPoint {
  x: number;
  y: number;
  z: number;
  floored(): IPoint;
  minus(val: IPoint): IPoint;
  plus(offset: IPoint): IPoint;
  scaled(apothem: number): IPoint;
}

export interface IWindow {
  slots: number[];
}
