export const ok = (res, message = "ok") => {
    return res.status(200).json({
        success: message
    });
}

export const response = (res, result) => {
    return res.status(200).json(result);
}

export const oops = (res, message = "Ooops!") => {
    return res.status(400).json({
        error: message
    });
}
