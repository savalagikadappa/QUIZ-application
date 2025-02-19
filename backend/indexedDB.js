import { openDB } from 'idb';

const DB_NAME = 'QuizAppDB';
const DB_VERSION = 2;
const QUESTIONS_STORE = 'questions';
const RESULTS_STORE = 'results'; // ✅ New store for results

// ✅ Initialize DB with two object stores
export const initDB = async () => {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(QUESTIONS_STORE)) {
                db.createObjectStore(QUESTIONS_STORE, { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains(RESULTS_STORE)) {
                db.createObjectStore(RESULTS_STORE, { autoIncrement: true }); // Auto ID for results
            }
        },
    });
};

// ✅ Add questions to IndexedDB
export const addQuestions = async (questions) => {
    const db = await initDB();
    const tx = db.transaction(QUESTIONS_STORE, 'readwrite');
    const store = tx.objectStore(QUESTIONS_STORE);

    for (const question of questions) {
        await store.put(question);
    }

    await tx.done;
    console.log('Questions added to IndexedDB');
};

// ✅ Get all questions
export const getQuestions = async () => {
    const db = await initDB();
    return db.getAll(QUESTIONS_STORE);
};

// ✅ Store quiz results (score & timestamp)
export const saveResult = async (score) => {
    const db = await initDB();
    const tx = db.transaction(RESULTS_STORE, 'readwrite');
    const store = tx.objectStore(RESULTS_STORE);

    const result = {
        score,
        timestamp: new Date().toISOString(), // Store as ISO format
    };

    await store.add(result);
    await tx.done;
    console.log('Result saved:', result);
};

// ✅ Get all past results
export const getResults = async () => {
    const db = await initDB();
    return db.getAll(RESULTS_STORE);
};
