

declare namespace ElementTable {
  export type ConditionalKeys<Base, Condition> = NonNullable<
    {
      [Key in keyof Base]: Key extends Condition ? Key : never;
    }[keyof Base]
  >;

  export type eventKey = NonNullable<eventKeyVal[keyof eventKeyVal]>;

  export type CamelEventKey<T extends string> = {
    [key in T]: key extends `on${infer stringA}-${infer stringB}`
      ? `on${stringA}${Capitalize<stringB>}`
      : key;
  };

  export type eventJsx = CamelEventKey<
    CamelEventKey<EmitKeyMethod>[keyof CamelEventKey<EmitKeyMethod>]
  >;
  
  export type eventKeyName = eventJsx[keyof eventJsx];

  export type eventMethodProps = {
    [key in eventKeyName]: (...args: any[]) => any;
  };

  export type KeyConstructor<Base extends object> = {
    [KeyProp in keyof Base]: PropType<Base[KeyProp]>;
  };
}
