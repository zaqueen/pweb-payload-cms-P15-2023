/** @type {import('payload/types').CollectionConfig} */

import payload from 'payload';

const Todo = {
  slug: 'Todo', // Anda perlu menambahkan slug yang sesuai
  admin: {
    useAsTitle: 'name'
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
      defaultValue: 'false',
    },
    {
      name: 'priority',
      type: 'relationship',
      required: true,
      relationTo: 'Category',
    },
    {
      name: 'prio',
      label: 'Prio',
      type: 'text',
    },
  ],
  hooks: {
    beforeOperation: [(args) => {
      if (args.operation == "create"){
        payload.create({
          collection: "Log",
          data: {
            collectionName: "Todo",
            action: "Create",
            timestamp: new Date()
          }
        })
      }else if (args.operation == "delete"){
        payload.create({
          collection: "Log",
          data: {
            collectionName: "Todo",
            action: "Delete",
            timestamp: new Date()
          }
        })
      } else if (args.operation == "update"){
        payload.create({
          collection: "Log",
          data: {
            collectionName: "Todo",
            action: "Update",
            timestamp: new Date()
          }
        })
      }
    }]
  }
};

export default Todo;
