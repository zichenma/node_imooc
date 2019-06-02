class BaseModel {
    constructor(data, message) {
        // 可以传一个对象或者一个字符串
        if (typeof data === 'string') {
            this.message = data;
            data = null;
            message = null;
        }
        if (data) {
            this.data = data;
        }
        if (message) {
            this.message = message;
        }
    }
}

class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errno = 0;
    }
}

class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errno = -1;
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}