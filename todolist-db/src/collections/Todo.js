/** @type {import('payload/types').CollectionConfig} */
const Todo = {
    slug: 'Todo', // Anda perlu menambahkan slug yang sesuai
    admin : {
      useAsTitle : 'name'
    },
    access: {
      read: () => true,
      update: () => true,
      delete: () => true,
      create: () => true,
    },

    fields: [
      {
        name: 'name',
        label: 'Title',
        type: 'text',
        required: true,
      },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
      },
      {
        name: 'status',
        label: 'Status',
        type: 'text',
        defaultValue: "false"
      },
      {
        name: 'priority',
        type: 'text',
        // required: true,
        // relationTo: 'Category',
      },
    ],
  };
  
  export default Todo;