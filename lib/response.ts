export const ok = (res, message = "ok") => {
    return res.status(200).json({
        success: message
    });
}
export const oops = (res, message = "Ooops!") => {
    return res.status(404).json({
        error: message
    });
}