module.exports = {
    success: (data) => {
        let res = {
            status: 200,
            message: 'Success',
        }

        if (typeof data !== 'undefined') {
            res.data = data;
        }

        return res;
    },

    failed: (message, data) => {
        let res = {
            status: 400,
            message: message,
        }

        if (typeof data !== 'undefined') {
            res.data = data;
        }

        return res;
    }
}