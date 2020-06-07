export default class Likes {
    constructor() {
        this.likes = [];
    }
    addLikes(id, source, url, image){     // url after source

        const like = {id, source, url, image}; // url after source
        this.likes.push(like);
        
        // perist data into local Storage
        this.persistData();

        return like

    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);


        // perist data into local Storage
        this.persistData();


    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumlikes() {
        this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        const storage = JSON.parse( localStorage.getItem('likes') );
        
        // Restoring likes from the localstorage
        if(storage) this.likes = storage;
    }

}