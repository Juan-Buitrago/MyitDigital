export const CONFIGURATION_TBL_USER = {
  noDataMessage: "No hay registros encontrados",
  attr: {
    class: 'tbl-usuarios'
  },
  actions: {
    columnTitle: '',
    position: 'right',
    delete: false,
    add: false,
    edit: false,
    custom: [
      { name: 'Actualizar', title: '<span class="text-center"><i class="fas fa-pencil-alt" title="Actualizar empleado"></i></span>' }
    ],
  },
  delete: {
    deleteButtonContent: 'Eliminar'
  },
  pager: {
    display: true,
    perPage: 20
  },
  hideSubHeader: false,
  columns: {
    IdLegal: {
      title: 'Id Legal'
    },
    Nombre: {
      title: 'Nombre'
    },
    Apellido1: {
      title: 'Apellido 1'
    },
    Apellido2: {
      title: 'Apellido 2'
    }
  }
};
