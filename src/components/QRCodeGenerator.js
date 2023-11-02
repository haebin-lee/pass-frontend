import QRCode from "qrcode";

export const qrGenerator = async (url) => {
    try {
        const qrAddr = await QRCode.toDataURL(url);
        return qrAddr;
    } catch(error) {
        console.error(error);
    }
};
