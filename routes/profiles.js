const express = require('express')
const router = express.Router()
const Profile = require('../models/profile')

router.get('/', async (req, res) => {
    let searchOption = {}
    if (req.query.name != null && req.query.name !== ''){//get request receive info in query string
        searchOption.name = new RegExp(req.query.name, 'i')//regularExp to search name
    }

    try {
        const profiles = await Profile.find(searchOption)//to show only searched name
        res.render('profiles/index', { //paranthese inside it
            profiles: profiles,//for value of authors
            searchOption: req.query//for searching from query
        })
    } catch {
        res.redirect('/')//if error then reload the same page
    }
    //in views folder
})

router.get('/new', (req, res) => {
    res.render('profiles/new', { profile: new Profile() })//using authorSchema, var(send to ejs file ) which creates and edit author in db
})

router.post('/', async (req, res) => {
    const profile = new Profile({
        name: req.body.name//post request sends info body string
    })
    try{
        const newProfile = await profile.save()
        res.redirect('profiles')
    } catch {//if there is an error
        res.render('profiles/new', {                 
            profile: profile,                         
            errorMessage: 'Error Creating Author'   
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id)
        res.render('profiles/show', {
            profile: profile
        })
    } catch {
        res.redirect('/')
    }
})
router.get('/:id/edit', async (req, res) => {
    try{
         const profile = await Profile.findById(req.params.id)
        res.render('profiles/edit', { profile: profile })
    } catch {
        res.redirect('/profiles')
    }
})
router.put('/:id', async (req, res) => {
    let profile
    try{
        profile = await Profile.findById(req.params.id)
        profile.name = req.body.name
        await profile.save()
        res.redirect(`/profiles/${profile.id}`)
    } catch {
        if(profile == null){
            res.redirect('/')
        } else {
            res.render('profiles/edit', {                 
                profile: profile,                        
                errorMessage: 'Error Updating Author'  
            })
        }
        
    }
})
router.delete('/:id', async (req, res) => {
    let profile
    try{
        profile = await Profile.findById(req.params.id)
        await profile.remove()
        res.redirect('/profiles')
    } catch {
        if(profile == null){
            res.redirect('/')
        } else {
            res.redirect(`/profiles/${profiles.id}`)
        }
        
    }})

    module.exports = router