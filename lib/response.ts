export const ok = (res, message = "ok") => {
    return res.status(200).json({
        success: message
    });
}
