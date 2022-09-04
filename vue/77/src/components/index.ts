import { App,createApp } from "vue";
import Table from './elementTable';

function install(app: ReturnType<typeof createApp>, options = {}) {
  app.component(Table.name, Table);
}

export type ElementTable = typeof Table & {
  install: (app: App, options: Record<string, any>) => App;
};

Table.install = install;

export default Table as ElementTable;

export  { Table };
