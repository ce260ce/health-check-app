// src/hooks/useHealthRecords.js
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useHealthRecords = (year, month) => {
    const [records, setRecords] = useState([]);
    const [names, setNames] = useState([]);

    // useHealthRecords.js
    const API_URL = process.env.REACT_APP_API_URL;

    const fetchRecords = useCallback(async () => {
        try {
            const res = await axios.get(`${API_URL}/api/health?year=${year}&month=${month}`);
            setRecords(res.data);
        } catch (err) {
            console.error("健康チェックデータ取得エラー", err);
        }
    }, [API_URL, year, month]);

    const fetchNames = useCallback(async () => {
        try {
            const res = await axios.get(`${API_URL}/api/names`);
            setNames(res.data.map(n => n.name));
        } catch (err) {
            console.error("氏名取得エラー", err);
        }
    }, [API_URL]);

    const postRecord = async (record) => {
        try {
            await axios.post(`${API_URL}/api/health`, record);
            await fetchRecords();
        } catch (err) {
            console.error("送信失敗", err);
        }
    };


    useEffect(() => {
        fetchRecords();
    }, [fetchRecords]); // ✅ 依存配列に fetchRecords を追加！

    useEffect(() => {
        fetchNames();
    }, [fetchNames]);

    return { records, names, postRecord };
};
