import { Subject } from '../orms'



export const _speeches = ({ skip, limit, order, sort, filter }) => new Promise((resolve, reject) => {
  Speech.findAndCountAll({
    where: global.parseJson(filter),
    order: [
      [order, sort]
    ],
    offset: skip,
    limit
  }).then(({ count, rows }) => {
    return resolve({ speeches: rows, totalCount: count })
  })
})

export const _speechById = id => new Promise((resolve, reject) => {
  Speech.findByPk(id).then(speech => resolve(speech))
})

export const _createSpeech = ({ name }) => new Promise((resolve, reject) => {
  Speech.findOne({ where: { name } }).then(speech => {
    if (!!speech)
      return resolve({ scs: false, msg: 'That Speech already exists!' })

    Speech.create({ name }).then(subject => {
      return resolve({ scs: true, msg: 'Speech Created!', speech: speech.dataValues })
    })
  })
})

export const _editSpeech = ({ id, name }) => new Promise((resolve, reject) => {
  Speech.findByPk(id).then(speech => {
    if (!speech)
      return resolve({ scs: false, msg: 'What are you going to edit?' })

    Speech.findOne({ where: { name } }).then(exist => {
      if (!!exist)
        return resolve({ scs: false, msg: 'That Speech already exists' })

      speech.name = name
      speech.save()
      return resolve({ scs: true, msg: 'Speech Updated!', speech: speech.dataValues })
    })
  })
})

export const _deleteSpeech = id => new Promise((resolve, reject) => {
  Speech.findByPk(id).then(speech => {
    if (!speech)
      return resolve({ scs: false, msg: 'What are you going to delete?' })

    speech.destroy()
    return resolve({ scs: true, msg: 'Speech Deleted!', speech: speech.dataValues })
  })
})