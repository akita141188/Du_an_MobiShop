const message =()=>{
    return 'Nguyen xuan truong';
}
const message2 =()=>{
    return 'welcome to VN';
}
// xuat file
module.exports = message;
// xuat nhieu file
// module.exports = {
//     message: message,
//     message2: message2,
// };


// khi có key và value giống nhau thì chỉ cần viết 1;
module.exports = {
    message,
    message2,
};