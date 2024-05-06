import styles from "./song.css"

export enum Attribute {
    'image' = 'image',
    'title' = 'Title',
    'autor' = 'autor',
    'album' = 'album',
    'Dateadded' = 'Dateadded',
    'duration' = 'duration'
}

class Song extends HTMLElement{
    image?: string;
    Title?: string;
    autor?: string;
    album?: string;
    Dateadded?: string;
    duration?: number;

    constructor(){
    super()
    this.attachShadow({mode:'open'})
    }

    static get observedAttributes(){
        const attrs: Record<Attribute, null> = {
        image: null,
        Title: null,
        autor: null,
        album: null,
        Dateadded: null,
        duration: null
        }
    return Object.keys(attrs);
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined){
        switch (propName) {
            case Attribute.duration:
                this.duration = newValue ? Number (newValue): undefined;
                break;
            default:
                this[propName] = newValue
                break;
        }
    }

    connectedCallback(){
    this.render()
    }

    render(){
    if(this.shadowRoot){
    this.shadowRoot.innerHTML = `
    <img src="${this.image}" alt="Portada de un album">
    <h2>${this.title}</h2>
    <p>Autor: ${this.autor}</p>
    <p>Álbum: ${this.album}</p>
    <p>Fecha añadida: ${this.Dateadded} </p>
    <p>Duración: ${this.duration} s</p>
    `
    }
    const cssSong= this.ownerDocument.createElement("style");
    cssSong.innerHTML = styles;
    this.shadowRoot?.appendChild(cssSong);
    }
}
export default Song
customElements.define('app-song', Song)