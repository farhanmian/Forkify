import uniqid from 'uniqid';

export default class list {
    constructor() {
        this.items = [];
    }


    addItem(count, unit, ingerdient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingerdient

        }
        this.items.push(item);
        return item;
    };


    deleteItem(id) {
        const index = this.items. findIndex(el => el.id === id);
        //[2,4,8] splice(1, 2) --> return [4, 8], orignal arr = [2]
        //[2,4,8] slice(1, 2) --> return [4], orignal arr = [2, 4, 8]
        // this.items.splice(index, 1)
        this.items.splice(index, 1);
    };


    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
        return newCount;
    };

}