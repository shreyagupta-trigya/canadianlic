import { openDB } from "idb";
import CryptoJS from "crypto-js";

const DB_NAME = "UserPermissionsDB";
const STORE_NAME = "permissions";
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decriptData = (data) => {
    return JSON.parse(
        CryptoJS.AES.decrypt(data, SECRET_KEY).toString(CryptoJS.enc.Utf8)
    );
};

export const initDB = async () => {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id" });
            }
        },
    });
};

export const savePermissions = async (userData) => {
    try {
        const db = await initDB();
        const dataPayload = {
            id: userData?.ROWID, // ✅ MUST be present for keyPath "id"
            ROWID: userData?.ROWID,
            employeeName: userData?.employeeName,
            email: userData?.email,
            phoneNumber: userData?.phoneNumber,
            role: userData?.rolesName,
            permissions: encryptData(userData?.permissions)
        };
        await db.put(STORE_NAME, dataPayload);

        let encryptId = encryptData(userData?.ROWID);
        localStorage.setItem("id", encryptId);
        return true;
    } catch (err) {
        console.log('savePermissions error:', err);
        return false;
    }
};


export const getPermissions = async (ROWID) => {
    const db = await initDB();
    const data = await db.get(STORE_NAME, ROWID);
    return decriptData(data.permissions);
};
