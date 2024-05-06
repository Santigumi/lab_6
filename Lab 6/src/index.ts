import { Songs } from "./components/types/song"
import { addSong } from "./components/utils/firebase"
import { getSongs } from "./components/utils/firebase"
import Song, { Attribute } from "./components/song/Song"
import styles from "./index.css"

const formData: Omit<Songs, 'id'> = {
    image: '',
    Title: '',
    autor: '',
    album: '',
    Dateadded: '',
    duration: 0,
}

class Appcontainer extends HTMLElement{

    constructor(){
    super()
    this.attachShadow({mode:'open'})
    }

    connectedCallback(){
    this.render()
    }

    async render(){

    const text = this.ownerDocument.createElement('h1')
    text.innerText = 'Añade una canción'
    this.shadowRoot?.appendChild(text)

    const image = this.ownerDocument.createElement('input')
    image.type = 'url'
    image.placeholder = 'Portada (url)'
    image.addEventListener('change', this.addImage)
    this.shadowRoot?.appendChild(image)


    const Title = this.ownerDocument.createElement('input')
    Title.placeholder = 'Título'
    Title.addEventListener('change', this.addTitle)
    this.shadowRoot?.appendChild(Title)

    const autor = this.ownerDocument.createElement('input')
    autor.placeholder = 'Autor'
    autor.addEventListener('change', this.addAutor)
    this.shadowRoot?.appendChild(autor) 

    const album = this.ownerDocument.createElement('input')
    album.placeholder = 'Album'
    album.addEventListener('change', this.addAlbum)
    this.shadowRoot?.appendChild(album)

    const labeldate = this.ownerDocument.createElement('label')
    labeldate.id = 'date'
    labeldate.innerText = 'Fecha'
    const Dateadded = this.ownerDocument.createElement('input')
    Dateadded.id = 'date'
    Dateadded.type = 'date'
    Dateadded.placeholder = 'Fecha de lanzamiento'
    Dateadded.addEventListener('change', this.addDateadded)
    this.shadowRoot?.appendChild(labeldate)
    this.shadowRoot?.appendChild(Dateadded)

    const duration = this.ownerDocument.createElement('input')
    duration.type = 'number'
    duration.placeholder = 'Duración (s)'
    duration.addEventListener('change', this.addDuration)
    this.shadowRoot?.appendChild(duration)

    const save = this.ownerDocument.createElement('button');
    save.innerHTML = 'Guardar canción'
    save.addEventListener('click', this.submitForm)
    this.shadowRoot?.appendChild(save)

    const sectionSongs = document.createElement('section');

    const songs = await getSongs();
    songs.forEach((song: Songs)=>{
    const cart = document.createElement('app-song') as Song;
    cart.setAttribute(Attribute.image, song.image)
    cart.setAttribute(Attribute.title, song.Title)
    cart.setAttribute(Attribute.autor, song.autor)
    cart.setAttribute(Attribute.album, song.album)
    cart.setAttribute(Attribute.Dateadded, song.Dateadded)
    cart.setAttribute(Attribute.duration, JSON.stringify(song.duration))
    sectionSongs.appendChild(cart)
    this.shadowRoot?.appendChild(sectionSongs)
    })
  
    const cssSong= this.ownerDocument.createElement("style");
    cssSong.innerHTML = styles;
    this.shadowRoot?.appendChild(cssSong);
    }


    addImage(e: any){
    formData.image = e.target?.value
    }

    addTitle(e: any){
    formData.Title = e.target?.value
    }

    addAutor(e: any){
    formData.autor = e.target?.value
    }

    addAlbum(e: any){
    formData.album = e.target?.value
    }

    addDateadded(e: any){
    formData.Dateadded = e.target?.value
    }

    addDuration(e: any){
    formData.duration = parseFloat(e.target?.value)
    }

    submitForm(){
    addSong(formData);
    }

}
export default Appcontainer
customElements.define('app-container', Appcontainer)