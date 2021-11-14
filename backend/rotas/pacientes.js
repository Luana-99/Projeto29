const express = require("express");
const router = express.Router();
const Paciente = require("../models/paciente");
router.post("", (req, res, next) => {
  const paciente = new Paciente({
    _id: req.params.id,
    nome: req.body.nome,
      fone: req.body.fone,
      email: req.body.email,
      senha:req.body.senha,
      estado:req.body.estado,
      datanasc:req.body.datanasc,
  });
  paciente.save().then((pacienteInserido) => {
    res.status(201).json({
      mensagem: "paciente inserido",
      id: pacienteInserido._id,
    });
  });
});

router.get("", (req, res, next) => {
    debugger
  Paciente.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      mensagem: "Tudo OK",
      pacientes: documents,
    });
  });
});
router.delete("/:id", (req, res, next) => {
  console.log("id: ", req.params.id);
  Paciente.deleteOne({ _id: req.params.id }).then((resultado) => {
    console.log(resultado);
    res.status(200).json({ mensagem: "Paciente removido" });
  });
});
router.put("/:id", (req, res, next) => {
  const paciente = new Paciente({
    _id: req.params.id,
    nome: req.body.nome,
      fone: req.body.fone,
      email: req.body.email,
      senha:req.body.senha,
      estado:req.body.estado,
      datanasc:req.body.datanasc,
  });
  Paciente.updateOne({ _id: req.params.id }, paciente).then((resultado) => {
    console.log(resultado);
    res.status(200).json({ mensagem: "Atualização realizada com sucesso" });
  });
});
router.get("/:id", (req, res, next) => {
  Paciente.findById(req.params.id).then((pac) => {
    if (pac) {
      res.status(200).json(pac);
    } else res.status(404).json({ mensagem: "paciente não encontrado!" });
  });
});
module.exports = router;
