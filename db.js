const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getScene: getScene,
  getChoice: getChoice,
  getScenesNew: getScenesNew
}

function getScenes (testConn) {
  const conn = testConn || connection
  return conn('scenes')
    .join('choices', 'scenes.id', 'choices.scene_id')
    .select('scenes.id as id', 'choices.choice_id', 'scenes.text as scene_text', 'choices.text as choice_text', 'scenes.title', 'scenes.next', 'scenes.image', 'choices.points', 'choices.consequences')
  }

function getScene (id, testConn) {
  const conn = testConn || connection
  return getScenes(conn).where('id', id)
    .then((untidy) => {
      return tidy (untidy)
  })
}


function getChoice (choice, testConn) {
  const conn = testConn || connection
  let choice_id = choice.choice
  return conn('choices').where('choice_id', choice_id)
    .join('scenes', 'choices.scene_id', 'scenes.id')
    .select('choices.scene_id', 'choices.choice_id', 'choices.text as choice_text', 'scenes.next', 'choices.points', 'choices.consequences')
    .then((untidyChoice) => {
    return tidyChoice(untidyChoice)
  })
}

function getScenesNew (testConn) {
  const conn = testConn || connection
  return conn('scenes')
    .join('choices', 'scenes.id', 'choices.scene_id')
    .select('scenes.id as id', 'choices.choice_id', 'scenes.text as scene_text', 'choices.text as choice_text', 'scenes.title', 'scenes.next', 'scenes.image', 'choices.points', 'choices.consequences')
    .then((untidy) => {
      return tidyScenes(untidy)
    })
  }



  function tidyScenes (untidy) {
    let tidied = []
    for (let i = 0; i < untidy.length; i++) {
      tidied.push({})
      tidied[i].id = untidy[i].id
      tidied[i].scene_text = untidy[i].scene_text
      tidied[i].title = untidy[i].title
      tidied[i].image = untidy[i].image
      tidied[i].choices = []
      for (let j = 0; j < untidy.length; j++) {
        let newChoice = {}
        newChoice.choice_id = untidy[i].choice_id
        newChoice.choice_text = untidy[i].choice_text
        newChoice.next = untidy[i].next
        newChoice.points = untidy[i].points
        newChoice.consequences = untidy[i].consequences
        tidied[i].choices.push(newChoice)
      }
    }
    return tidied
    }
    


function tidyChoice (untidyChoice) {
  let tidiedChoice = {}
  tidiedChoice.scene_id = untidyChoice[0].scene_id
  tidiedChoice.choice_id = untidyChoice[0].choice_id
  tidiedChoice.points = untidyChoice[0].points
  tidiedChoice.next = untidyChoice[0].next
  tidiedChoice.consequences = untidyChoice[0].consequences
  return tidiedChoice
}


function tidy (untidy) {
  let tidied = {}
  tidied.id = untidy[0].id
  tidied.scene_text = untidy[0].scene_text
  tidied.title = untidy[0].title
  tidied.image = untidy[0].image
  tidied.choices = []
  for (let i = 0; i < untidy.length; i++) {
    let newChoice = {}
    newChoice.choice_id = untidy[i].choice_id
    newChoice.choice_text = untidy[i].choice_text
    newChoice.next = untidy[i].next
    newChoice.points = untidy[i].points
    newChoice.consequences = untidy[i].consequences
    tidied.choices.push(newChoice)
  }
  return tidied
}