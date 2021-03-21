

export const initialState = {
  loggedUser: null,
  users: [
    {
      id: 1,
      username: 'Pepe',
      money: 1000,
      password: 'pepe'
    },
    {
      id: 2,
      username: 'Pepa',
      money: 2000,
      password: 'pepa'
    },
  ],
  transfers: [
    {
      sender: 1,
      quantity: 1000,
      recipient: 1
    },
    {
      sender: 2,
      quantity: 2000,
      recipient: 2
    }
  ]

}
