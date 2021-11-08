import mercadopago from 'mercadopago'

const mercadoPago = mercadopago.configure({
  access_token: 'TEST-495169915425704-110421-1afc7c29c221de8f6f398bdf27b3f3b7-95489948',
})

var preference = {
  items: [
    {
      title: 'Test',
      quantity: 1,
      currency_id: 'ARS',
      unit_price: 10.5,
    },
  ],
}

// mercadopago.preferences.create(preference)

export default mercadoPago
