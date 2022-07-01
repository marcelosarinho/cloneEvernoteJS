var express = require("express");
var router = express.Router();
const Note = require("../models/note");
const authToken = require("../middlewares/auth");

router.post("/create", authToken, async (req, res) => {
  const { title, body } = req.body
  let note = new Note({ title: title, body: body, author: req.user._id })
  try {
    await note.save()
    res.status(201).json(note)
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar a nota!" })
  }
})

router.get("/search", authToken, async (req, res) => {
  const { query } = req.query
  try {
    let notes = await Note.find({ author: req.user._id }).find({ $text: { $search: query } })
    res.status(200).json(notes)
  } catch (error) {
    res.status(404).json({ error: "Nota não encontrada!" })
  }
})

router.get("/:id", authToken, async (req, res) => {
  try {
    const { id } = req.params
    let note = await Note.findById(id)
    if (authOwner(req.user, note))
      res.status(200).json(note)
    else
      res.status(403).json({ error: "Não foi possível acessar a nota!" })
  } catch (error) {
    res.status(502).json({ error: "Nota não encontrada!" })
  }
})

router.get("/", authToken, async (req, res) => {
  try {
    let notes = await Note.find({ author: req.user._id })
    res.status(200).json(notes)
  } catch (error) {
    res.status(502).json({ error: "Não foi possível mostrar as notas!" })
  }
})

router.put("/:id", authToken, async (req, res) => {
  const { title, body } = req.body
  const { id } = req.params
  try {
    let note = await Note.findById(id)
    if (authOwner(req.user, note)) {
      let note = await Note.findOneAndUpdate(
        { _id: id },
        { $set: { title: title, body: body } },
        { upsert: true, "new": true }
      )
      res.status(200).json(note)
    }
    else
      res.status(403).json({ error: "Não foi possível acessar a nota!" })
  } catch (error) {
    res.status(400).json({ error: "Erro ao editar nota!" })
  }
})

router.delete("/:id", authToken, async (req, res) => {
  const { id } = req.params
  try {
    let note = await Note.findById(id)
    if (note && authOwner(req.user, note)) {
      await note.delete()
      res.status(200).json({ message: "Nota deletada." })
    }
    else
      res.status(403).json({ error: "Não foi possível acessar a nota!" })
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar a nota!" })
  }
})

const authOwner = (user, note) => {
  if (JSON.stringify(user._id) === JSON.stringify(note.author._id))
    return true
  else
    return false
}

module.exports = router;