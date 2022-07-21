declare namespace PokeRequestData {
  export interface PokeDataType {
    id: number;
    types: Type[];
    name: string;
  }

  export interface Type {
    slot: number;
    type: Ability;
  }

  export interface Ability {
    name: string;
    url: string;
  }
}
