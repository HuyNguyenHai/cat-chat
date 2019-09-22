import moment from 'moment';

export let bufferToBase64 = (bufferFrom) => {
    return Buffer.from(bufferFrom).toString("base64");
};

export let convertTimestampToHumanTime = (timestamp) => {
    if(!timestamp) {
        return "";
    }
    return moment(timestamp).locale("vi").startOf("seconds").fromNow();
}
