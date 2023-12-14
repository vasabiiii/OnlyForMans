
const express = require('express');
const router = express.Router();
const passport = require('passport');
const {getExperiences, createVacancy, getMyVacancies, getVacancy, deleteVacancy, editVacancy, searchVacancy} = require('./controllers');
const { isManager } = require('../auth/middlewares');
const {validateVacancy, isVacancyAuthor} = require('./middlewares')


router.get('/api/experiences', getExperiences)
router.post('/api/vacancy', passport.authenticate('jwt', {session: false}), isManager, validateVacancy, createVacancy)
router.get('/api/vacancy', passport.authenticate('jwt', {session: false}), isManager, getMyVacancies)
router.get('/api/vacancy/search', searchVacancy)
router.get('/api/vacancy/:id', getVacancy)
router.delete('/api/vacancy/:id', passport.authenticate('jwt', {session: false}), isManager, isVacancyAuthor, deleteVacancy)
router.put('/api/vacancy', passport.authenticate('jwt', {session: false}), isManager, isVacancyAuthor, validateVacancy, editVacancy)



module.exports = router;