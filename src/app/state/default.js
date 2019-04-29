export const state = {
  items: {
    id: 1,
    name: 'Background is gray because I want so!',
    contents: 'Here comes the status!',
    children: [
      {
        id: 2,
        name: '2nd level',
        contents: '2nd level contents come in'
      },
      {
        id: 3,
        name: '2nd level 2',
        contents: '2nd (3) level contents come in',
        children: [
          {
            id: 4,
            name: '3rd level',
            contents: '3rd level contents come in'
          }
        ]
      }
    ]
  },
  term: ''
};
