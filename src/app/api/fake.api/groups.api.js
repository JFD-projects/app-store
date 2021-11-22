export const groupsObject = {
  iphone: { _id: '67rdca3eeb7f6fgeed471198', name: 'Apple iPhone' },
  makbook: { _id: '67rdca3eeb7f6fgeed471100', name: 'Apple MakBook' },
  imak: { _id: '67rdca3eeb7f6fgeed4711012', name: 'Apple iMak' },
  makpro: { _id: '67rdca3eeb7f6fgeed471101', name: 'Apple iPro' },
  applewatch: { _id: '67rdca3eeb7f6fgeed471102', name: 'Apple Watch' }
}

export const groups = [
  { _id: '67rdca3eeb7f6fgeed471198', name: 'Apple iPhone' },
  { _id: '67rdca3eeb7f6fgeed471100', name: 'Apple MakBook' },
  { _id: '67rdca3eeb7f6fgeed4711012', name: 'Apple iMak' },
  { _id: '67rdca3eeb7f6fgeed471101', name: 'Apple iPro' },
  { _id: '67rdca3eeb7f6fgeed471102', name: 'Apple Watch' }
]
const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(groupsObject)
    }, 1000)
  })

export default {
  fetchAll
}
