const async = require("hbs/lib/async")
const Meme = require("../models/Meme")

exports.getMemes = async (req, res) => {

    const allMemes = await Meme.find({})

    console.log(allMemes)

    return res.render("memes/memes", {
        memes: allMemes
    })

}

exports.createMeme = async (req, res) => {

    res.render("memes/create")
}

exports.createMemeForm = async (req, res) => {

    const { name, about, origin } = req.body

    try {

        const newMeme = await Meme.create({ name, about, origin })

        console.log(newMeme)

        return res.redirect("/memes")
        
    } catch (error) {
        
        console.log(error)

        return res.render("memes/create", {
            errorMsg: "Hubo un problema al crear el meme."
        })

    }

}

exports.getDetails = async (req, res) => {

try {
    
    const { memeID } = req.params
    console.log(memeID)
    console.log(typeof memeID)

    const singleMeme = await Meme.findById(memeID)

    return res.render("memes/details", {
        singleMeme
    })

} catch (error) {
    
    console.log(error)

    return res.render(`memes`, {
        errorMsg:"Hubo un problema al cargar los detalles del meme"
    })

}

}

exports.editMeme = async (req, res) => {

    const {memeID} = req.params
    
    const singleMeme = await Meme.findById(memeID)

    res.render("memes/edit", {
        singleMeme
    })

}

exports.editMemeForm = async (req, res) => {

    const { name, about, origin }= req.body

    const { memeID } = req.params

    await Meme.findByIdAndUpdate(
        memeID,
        { name, about, origin },
        { new: true }

    )
    
    res.redirect(`/memes/${memeID}`)
}

