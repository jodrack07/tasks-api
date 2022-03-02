/**
 * This wraper will be about providing the try{}catch(){} block for controllers to avoid some redondancy
 */
const asyncWrapper = (cb) => {
    return async (req, res, next) => {
        try {
            await cb(req, res, next)
        } catch (error) {
            next(error);
        }
    }
}

module.exports = asyncWrapper