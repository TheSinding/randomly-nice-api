const tokenizer = (input) => {
    return input
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=_`\"~()]/g, '')
        .split(' ');
};

export default tokenizer;