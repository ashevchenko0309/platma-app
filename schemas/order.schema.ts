export const orderSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    properties: {
        orders: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'Order id'
                    },
                    product: {
                        type: 'string',
                        description: 'Product name'
                    },
                    customer: {
                        type: 'string',
                        description: 'Customer name'
                    },
                    color: {
                        type: 'string',
                        description: 'Color of product'
                    },
                    category: {
                        type: 'string',
                        description: 'Category of product'
                    },
                    quantity: {
                        type: 'number',
                        minimum: 1,
                        description: 'Quantity of product'
                    },
                    price: {
                        type: 'number',
                        format: 'currency'
                    }
                },
                required: ['id', 'product', 'customer', 'quantity']
            }
        }
    },
    required: ['orders']
}

export const orderFormSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    required: ['product', 'phone', 'quantity', 'price'],
    properties: {
        product: {
            title: '',
            type: 'string'
        },
        phone: {
            type: 'string',
            title: 'Phone number',
            minLength: 10,
            pattern: '^1-\\d{3}-\\d{3}-\\d{4}$'
        },
        color: {
            type: 'string',
            enum: ['Blue', 'Green', 'Red']
        },
        status: {
            type: 'string',
            enum: ['Pending', 'Canceled', 'Done']
        },
        category: {
            type: 'string'
        },
        quantity: {
            type: 'number',
            minimum: 1,
            maximum: 5
        },
        price: {
            type: 'number',
            minimum: 100,
            maximum: 1500
        }
    }
}
